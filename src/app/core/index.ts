import { LineSeriesOption, SeriesOption } from 'echarts';
import { environment } from 'src/environments/environment';
import { RaidDeviceSummaryType } from './adapter-interface/RaidDeviceSummaryType';
import { VersionsDataContainerType } from './adapter-interface/VersionsDataContainerType';
import { AtoSystemDto } from './dto/AtoSystemDto';
import { BasicApplicationInformationDto } from './dto/BasicApplicationInformationDto';
import { CertificateDto } from './dto/CertificateDto';
import { RaidDeviceDto } from './dto/RaidDeviceDto';

export * from './adapter-interface/GroupedBarChartDataType';
export * from './adapter-interface/RaidDeviceSummaryType';
export * from './adapter-interface/VersionsDataContainerType';

export * from './dto/AggregatedFileSystemDto';
export * from './dto/ApplicationsDto';
export * from './dto/AssociatedAtoProcessMetricsDto';
export * from './dto/AtoApplicationDto';
export * from './dto/AtoSystemDto';
export * from './dto/AtoTrackAreaDto';
export * from './dto/BasicApplicationInformationDto';
export * from './dto/CertificateDto';
export * from './dto/ConnectedOnboardDto';
export * from './dto/CpuDto';
export * from './dto/CurrentSegmentDto';
export * from './dto/FileSystemDto';
export * from './dto/PreviousTimingPointDto';
export * from './dto/RaidBitmapInformationDto';
export * from './dto/RaidDeviceDto';
export * from './dto/RaidDiskInformationDto';
export * from './dto/RaidResyncInformationDto';
export * from './dto/RamDto';
export * from './dto/RunningVersionDto';
export * from './dto/TimingPointEstimationDto';
export * from './dto/ValueDto';

export function isValidString(str: string | null): boolean {
  // Check if the string is not null or undefined
  if (str != null) {
    // Trim the string to remove leading and trailing whitespace
    const trimmedStr = str.trim();
    // Check if the trimmed string is not empty
    if (trimmedStr !== '') {
      return true; // The string is valid
    }
  }
  return false; // The string is invalid
}

export function summarizeRaidDevice(device: RaidDeviceDto) {
  const raidDeviceSummary: RaidDeviceSummaryType = {
    deviceName: device.identifier.value,
    summary: RAID_DEVICE_FAILED_LITERAL,
  };

  if (device.nonDegradedDiskCount.value === device.raidDisksCount.value) {
    // All disks are functioning properly
    raidDeviceSummary.summary = RAID_DEVICE_HEALTHY_LITERAL;
  } else if (device.resyncInformation != null) {
    // Device is rebuilding/resyncing
    raidDeviceSummary.summary = RAID_DEVICE_RESYNC_LITERAL;
  } else if (device.nonDegradedDiskCount.value < device.raidDisksCount.value) {
    // Some disks are experiencing faults or errors
    raidDeviceSummary.summary = RAID_DEVICE_DEGRADED_LITERAL;
  } else {
    // Device is in a failed state
    raidDeviceSummary.summary = RAID_DEVICE_FAILED_LITERAL;
  }

  return raidDeviceSummary;
}

export function mapToVersionsDataContainer(serverData: AtoSystemDto): VersionsDataContainerType {
  const applications = new Array<BasicApplicationInformationDto>();

  applications.push(serverData.applications.atoCore);
  applications.push(serverData.applications.database);
  applications.push(serverData.applications.onboardAdapter);
  applications.push(serverData.applications.statusAdapter);
  applications.push(serverData.applications.trackDataAdapter);
  applications.push(serverData.applications.trainPositionAdapter);
  applications.push(serverData.applications.travelplanAdapter);

  return {
    applications: applications,
    trackAreas: serverData.trackAreas,
  } as VersionsDataContainerType;
}

export function createLineSeriesOption(seriesName: string, isHidden: boolean, dataset: DateNumberTuple[]): LineSeriesOption {
  return {
    name: seriesName,
    type: 'line',
    smooth: true,
    lineStyle: {
      width: isHidden ? 0 : 2,
    },
    symbol: 'circle',
    symbolSize: isHidden ? 0 : 3,
    data: dataset,
  };
}

export function updateVisibilityForLineChart(selectedServerName: string, lineChartDataMap: Map<string, SeriesOption>): void {
  lineChartDataMap.forEach((lineSeriesOption, serverName) => {
    const isHidden = isValidString(selectedServerName) && serverName != selectedServerName;

    (lineSeriesOption as LineSeriesOption).lineStyle!.width = isHidden ? 0 : 2;
    (lineSeriesOption as LineSeriesOption).symbolSize = isHidden ? 0 : 3;
  });
}

/**
 * Parses a date string in the format "MM/DD/YY HH:MM:SS.sssssss GMT" and adjusts the year
 * based on a specified value from the environment configuration.
 * If the input date string is in the format "MM/DD/YY HH:mm:ss.SSSSSSS GMT", years are interpreted
 * as 20xx instead of 19xx
 *
 * @param {string} dateStr - The date string to parse and adjust.
 * @returns {string} A formatted date string with the adjusted year.
 */
function parseDateWithAdjustedYear(dateStr: string): string {
  // Regular expression to match the date format "MM/DD/YY HH:MM:SS.sssssss GMT"
  const dateRegex = /(\d{2})\/(\d{2})\/(\d{2}) (\d{2}:\d{2}:\d{2}\.\d{7}) GMT$/;

  // Check if the input date string matches the expected format
  const match = dateStr.match(dateRegex);

  if (match) {
    const [, month, day, year, timePart] = match;
    let adjustedYear = parseInt(year);
    adjustedYear += Number(environment.certificates.yearToAddToAdjustDate);

    return `${month}/${day}/${adjustedYear} ${timePart}`;
  }

  return dateStr;
}

/**
 * Adjusts the date values within a CertificateDto object by calling the
 * `parseDateWithAdjustedYear` function for the 'validFrom.value' and 'validTo.value' properties.
 *
 * @param {CertificateDto} cert - The CertificateDto object to adjust.
 * @returns {CertificateDto} A CertificateDto object with adjusted date values.
 */
export function adjustCertificateDates(cert: CertificateDto): CertificateDto {
  cert.validFrom.value = parseDateWithAdjustedYear(cert.validFrom.value);
  cert.validTo.value = parseDateWithAdjustedYear(cert.validTo.value);

  return cert;
}

export function formatToReaderFriendlyDateTooltip(date: Date): string {
  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  const dateFormat: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  return `${new Intl.DateTimeFormat('en-UK', dateFormat).format(date)} ${new Intl.DateTimeFormat('en-US', timeFormat).format(date)}`;
}

export function formatToReaderFriendlyDateLabel(date: Date): string {
  const now = new Date();
  const sameYear = date.getFullYear() === now.getFullYear();
  const sameMonth = sameYear && date.getMonth() === now.getMonth();
  const sameDay = sameMonth && date.getDate() === now.getDate();

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  if (sameDay) {
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } else {
    const dateFormat: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: sameYear ? undefined : '2-digit',
    };

    return `${new Intl.DateTimeFormat('en-UK', dateFormat).format(date)} ${new Intl.DateTimeFormat('en-US', options).format(date)}`;
  }
}

export function calculateLabelRotationAngle(): number {
  const maxTicks = environment.dataRententionTimeInSeconds / environment.pollingIntervalInSeconds; // Maximum number of ticks on the x-axis
  const longestLabel = '24 Jul 23 12:12:12 PM'.length;
  const chartWidth = window.innerWidth;
  const availableWidthPerTick = chartWidth / maxTicks;

  // Calculate the width required to display the longest label without overlap
  const requiredWidth = longestLabel * 1; // Adjust the constant value as needed

  // Calculate the angle based on the available width and required width
  let angle = Math.atan(requiredWidth / availableWidthPerTick) * (180 / Math.PI);

  // Ensure the angle is not too steep, limit it to a maximum of 45 degrees
  angle = Math.min(angle, 35);

  return angle;
}

export type DateNumberTuple = [Date, number];
export type PillType = 'alarm' | 'critical' | 'info' | 'neutral' | 'success' | 'warning';
export type SupportedThemeType = 'theme-brand-light' | 'theme-brand-dark';

export const SESSION_EXPIRY_MESSAGE = 'Session has expired. Please login again';
export const CORS_ERROR_CODE = 0;
export const UNAUTHORIZED_ERROR_CODE = 401;
export const OVERVIEW_LITERAL = 'Overview';
export const USAGE_OVERVIEW_LITERAL = 'Usage Overview';
export const CERTIFICATES_LITERAL = 'Certificates';
export const RAID_DEVICES_LITERAL = 'RAID Devices';
export const VERSIONS_LITERAL = 'Versions';
export const CONNECTED_ONBOARDS_LITERAL = 'Connected Onboard Units';
export const CHARTS_BRAND_DARK_THEME_LITERAL = 'brand-dark';
export const ROUTE_TO_DIAGNOSTICS = '/diagnostics';
export const ROUTE_TO_USAGE_OVERVIEW = '/diagnostics/usage-overview';
export const ROUTE_TO_CERTIFICATES = '/diagnostics/certificates';
export const ROUTE_TO_VERSIONS = '/diagnostics/versions';
export const ROUTE_TO_RAID = '/diagnostics/raid';
export const ROUTE_TO_CONNECTED_ONBOARDS = '/diagnostics/connected-onboard-units';
export const USABLE_SPACE_LITERAL = 'Usable Space';
export const TOTAL_SPACE_LITERAL = 'Total Space';
export const EXPIRED_LITERAL = 'Expired';
export const EXPIRES_SOON_LITERAL = 'Expires Soon';
export const VALID_LITERAL = 'Valid';
export const RAID_DEVICE_HEALTHY_LITERAL = 'Healthy';
export const RAID_DEVICE_RESYNC_LITERAL = 'Resyncing';
export const RAID_DEVICE_DEGRADED_LITERAL = 'Degraded';
export const RAID_DEVICE_FAILED_LITERAL = 'Failed';
export const MEGABYTE_TO_GIGABYTE_DIVISOR = Math.pow(2, 10);
export const MEGABYTE_TO_TERABYTE_DIVISOR = Math.pow(2, 20);
export const HZ_TO_GHZ_DIVISOR = 1000000000;

export const SUPPORTED_THEMES: SupportedThemeType[] = ['theme-brand-dark', 'theme-brand-light'];
export const DEFAULT_THEME = SUPPORTED_THEMES[1];
// NOTE: The below line is required to resolve issues that show up while running `ng test`
// error TS2591: Cannot find name 'require'.
declare var require: any;
export const appVersion = require('../../../package.json').version;

export enum NE107HealthCategoryEnum {
  UNDEFINED = 0,
  NORMAL = 1,
  FAILURE = 2,
  OUT_OF_SPECIFICATION = 3,
  MAINTENANCE_REQUIRED = 4,
  FUNCTION_CHECK = 5,
  IN_TRANSITION = 6,
  SECURITY_ALERT = 7,
}

export const HEALTH_CATEGORY_ENUM_TO_LITERAL_MAP = new Map<number, string>([
  [NE107HealthCategoryEnum.UNDEFINED, 'Undefined'],
  [NE107HealthCategoryEnum.NORMAL, 'Normal'],
  [NE107HealthCategoryEnum.FAILURE, 'Failure'],
  [NE107HealthCategoryEnum.OUT_OF_SPECIFICATION, 'Out of Specification'],
  [NE107HealthCategoryEnum.MAINTENANCE_REQUIRED, 'Maintenance Required'],
  [NE107HealthCategoryEnum.FUNCTION_CHECK, 'Function Check'],
  [NE107HealthCategoryEnum.IN_TRANSITION, 'In Transition'],
  [NE107HealthCategoryEnum.SECURITY_ALERT, 'Security Alert'],
]);
export const CERTIFICATE_STATUS_VARIANT_MAP = new Map<string, PillType>([
  [EXPIRED_LITERAL, 'alarm'],
  [EXPIRES_SOON_LITERAL, 'warning'],
  [VALID_LITERAL, 'success'],
  ['default', 'neutral'],
]);
export const RAID_DEVICE_SUMMARY_VARIANT_MAP = new Map<string, PillType>([
  [RAID_DEVICE_FAILED_LITERAL, 'alarm'],
  [RAID_DEVICE_DEGRADED_LITERAL, 'alarm'],
  [RAID_DEVICE_RESYNC_LITERAL, 'warning'],
  [RAID_DEVICE_HEALTHY_LITERAL, 'success'],
  ['default', 'neutral'],
]);
export const PAGE_LINK_TITLE_MAP = new Map<string, string>([
  [ROUTE_TO_DIAGNOSTICS, OVERVIEW_LITERAL],
  [ROUTE_TO_USAGE_OVERVIEW, USAGE_OVERVIEW_LITERAL],
  [ROUTE_TO_CERTIFICATES, CERTIFICATES_LITERAL],
  [ROUTE_TO_RAID, RAID_DEVICES_LITERAL],
  [ROUTE_TO_VERSIONS, VERSIONS_LITERAL],
  [ROUTE_TO_CONNECTED_ONBOARDS, CONNECTED_ONBOARDS_LITERAL],
]);
export const APP_STATE_VARIANT_MAP = new Map<number, PillType>([
  [NE107HealthCategoryEnum.UNDEFINED, 'alarm'],
  [NE107HealthCategoryEnum.NORMAL, 'success'],
  [NE107HealthCategoryEnum.FAILURE, 'alarm'],
  [NE107HealthCategoryEnum.OUT_OF_SPECIFICATION, 'warning'],
  [NE107HealthCategoryEnum.MAINTENANCE_REQUIRED, 'warning'],
  [NE107HealthCategoryEnum.FUNCTION_CHECK, 'warning'],
  [NE107HealthCategoryEnum.IN_TRANSITION, 'warning'],
  [NE107HealthCategoryEnum.SECURITY_ALERT, 'alarm'],
]);
