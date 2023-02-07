import { sleep } from "k6";
import http from "k6/http";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.2/index.js";

function defaultScenarioConfig(executor) {
  return {
    executor: "ramping-vus",
    gracefulStop: "30s",
    stages: [
      { target: 5, duration: "1m" },
      { target: 5, duration: "3m30s" },
      { target: 0, duration: "1m" },
    ],
    gracefulRampDown: "30s",
    exec: executor,
  };
}
export const options = {
  ext: {
    loadimpact: {
      distribution: {
        "amazon:sg:singapore": {
          loadZone: "amazon:sg:singapore",
          percent: 100,
        },
      },
      apm: [],
    },
  },
  thresholds: {},
  scenarios: {
    Overviews: defaultScenarioConfig("overviews"),
    UpdateConcreteMix: defaultScenarioConfig("updateConcreteMix"),
    SetStartMonitorTime: defaultScenarioConfig("setStartMonitorTime"),
    SetStopMonitorTime: defaultScenarioConfig("setStopMonitorTime"),
    ViewStructureStatus: defaultScenarioConfig("viewStructureStatus"),
  },
};

export function overviews() {
  let response;

  // Sign-in
  response = http.post(
    "https://be-concrete-dev.wearedevin.com/auth/signin",
    '{\n    "formFields": [\n        {\n            "id": "email",\n            "value": "xiyi.ooi@concreteai.io"\n        },\n        {\n            "id": "password",\n            "value": "devin@123"\n        }\n    ]\n}',
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Overview
  response = http.get(
    "https://be-concrete-dev.wearedevin.com/api/overviews/castings"
  );

  // Automatically added sleep
  sleep(1);
}

export function updateConcreteMix() {
  let response;

  // Sign-in
  response = http.post(
    "https://be-concrete-dev.wearedevin.com/auth/signin",
    '{\n    "formFields": [\n        {\n            "id": "email",\n            "value": "xiyi.ooi@concreteai.io"\n        },\n        {\n            "id": "password",\n            "value": "devin@123"\n        }\n    ]\n}',
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Update-CM
  response = http.put(
    "https://be-concrete-dev.wearedevin.com/api/concrete-mixes/63c0ce736b1f1570c027d4b8",
    '{\n    "K": 0.241718316,\n    "M0": 0.69646183,\n    "Q": 3350,\n    "RT": 20,\n    "Su": 64.14003684,\n    "acceleratingAdmixture": 1,\n    "coarseAggregate": 12,\n    "concreteGrade": 40,\n    "fineAggrate": 12,\n    "flyAsh": 12,\n    "offset": 0,\n    "portland": 200,\n    "retardingMixture": 12,\n    "supplier": "Island Concrete",\n    "type": "G40 PFBC/4h retarder",\n    "water": 15,\n    "remarks": "Just sth ..."\n}',
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Automatically added sleep
  sleep(1);
}

export function setStartMonitorTime() {
  let response;

  // Sign-in
  response = http.post(
    "https://be-concrete-dev.wearedevin.com/auth/signin",
    '{\n    "formFields": [\n        {\n            "id": "email",\n            "value": "xiyi.ooi@concreteai.io"\n        },\n        {\n            "id": "password",\n            "value": "devin@123"\n        }\n    ]\n}',
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  //  Set start monitor time
  response = http.put(
    "https://be-concrete-dev.wearedevin.com/api/structures/63d8cb4f6125023c8b13e461/set-start",
    '{\n    "start": 1664281803\n}',
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Automatically added sleep
  sleep(1);
}

export function setStopMonitorTime() {
  let response;

  // Sign-in
  response = http.post(
    "https://be-concrete-dev.wearedevin.com/auth/signin",
    '{\n    "formFields": [\n        {\n            "id": "email",\n            "value": "xiyi.ooi@concreteai.io"\n        },\n        {\n            "id": "password",\n            "value": "devin@123"\n        }\n    ]\n}',
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  //  Set stop monitor time
  response = http.put(
    "https://be-concrete-dev.wearedevin.com/api/structures/63d8cb4f6125023c8b13e461/set-stop",
    '{\n    "stop": 1666983208\n}',
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Automatically added sleep
  sleep(1);
}

export function viewStructureStatus() {
  let response;

  // Sign-in
  response = http.post(
    "https://be-concrete-dev.wearedevin.com/auth/signin",
    '{\n    "formFields": [\n        {\n            "id": "email",\n            "value": "xiyi.ooi@concreteai.io"\n        },\n        {\n            "id": "password",\n            "value": "devin@123"\n        }\n    ]\n}',
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // view structure
  response = http.get(
    "https://be-concrete-dev.wearedevin.com/api/views/structure-status?castingId=63db3d9194e4552b7b147485",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Automatically added sleep
  sleep(1);
}

export function handleSummary(_) {
  console.log("Preparing the end-of-test summary...");

  return {
    "summary.json": textSummary(summary, { indent: " ", enableColors: true }), // Show the text summary to stdout...
  };
}
