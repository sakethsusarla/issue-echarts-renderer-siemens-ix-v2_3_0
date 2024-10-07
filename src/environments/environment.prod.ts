export const environment = {
    production: true,
    serverUrl: 'https://atotsui/',
    logoutEndpoint: '/logout',
    systemsDataEndpoint: '/diag/atosystem/list',
    onboardUnitsHistoricalDataEndpoint: '/historical/obcount',
    useSimulatedData: false,
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
  