import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
  duration: '3m',
  vus: 50,
  ext: {
    loadimpact: {
      distribution: { 'amazon:sg:singapore': { loadZone: 'amazon:sg:singapore', percent: 100 } },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 20, duration: '1m' },
        { target: 20, duration: '3m30s' },
        { target: 0, duration: '1m' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response

  // Sign-in
  response = http.post(
    'https://be-concrete-dev.wearedevin.com/auth/signin',
    '{\n    "formFields": [\n        {\n            "id": "email",\n            "value": "xiyi.ooi@concreteai.io"\n        },\n        {\n            "id": "password",\n            "value": "devin@123"\n        }\n    ]\n}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  // Overview
  response = http.get('https://be-concrete-dev.wearedevin.com/api/overviews/castings')

  // Automatically added sleep
  sleep(1)
}
