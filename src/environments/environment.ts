export const environment = {
  production: false,
  serverUrl: 'http://localhost:4881',
  logoutEndpoint: '/logout',
  systemsDataEndpoint: '/diag/atosystem/list',
  onboardUnitsHistoricalDataEndpoint: '/historical/obcount',
  useSimulatedData: true,
  pollingIntervalInSeconds: 5,
  minPortraitWidth: 600,
  minPortraitHeight: 800,
  minLandscapeWidth: 800,
  minLandscapeHeight: 600,
  dataRententionTimeInSeconds: 60,
  certificates: {
    yearToAddToAdjustDate: 2000,
    validDurationInSeconds: 60 * 60 * 1000,
    expiresSoonDurationInSeconds: 30 * 60 * 1000,
  },
};
