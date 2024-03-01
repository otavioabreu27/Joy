import http from 'k6/http';


export function uuidv4() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
}

export function randomIntBetween(min, max) { // min and max included
return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomItem(arrayOfItems){
return arrayOfItems[Math.floor(Math.random() * arrayOfItems.length)];
}

export function randomString(length) {
const charset = 'abcdefghijklmnopqrstuvwxyz';
let res = '';
while (length--) res += charset[Math.random() * charset.length | 0];
return res;
}

export function findBetween(content, left, right) {
let start = content.indexOf(left);
if (start === -1) {
    return '';
}
start += left.length;
const end = content.indexOf(right, start);
if (end === -1) {
    return '';
}
return content.substring(start, end);
}

export const options = {
  // A number specifying the number of VUs to run concurrently.
  vus: 20,
  // A string specifying the total duration of the test run.
  duration: '30s',

  // The following section contains configuration options for execution of this
  // test script in Grafana Cloud.
  //
  // See https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/
  // to learn about authoring and running k6 test scripts in Grafana k6 Cloud.
  //
  // ext: {
  //   loadimpact: {
  //     // The ID of the project to which the test is assigned in the k6 Cloud UI.
  //     // By default tests are executed in default project.
  //     projectID: "",
  //     // The name of the test in the k6 Cloud UI.
  //     // Test runs with the same name will be grouped.
  //     name: "script.js"
  //   }
  // },

  // Uncomment this section to enable the use of Browser API in your tests.
  //
  // See https://grafana.com/docs/k6/latest/using-k6-browser/running-browser-tests/ to learn more
  // about using Browser API in your test scripts.
  //
  // scenarios: {
  //   // The scenario name appears in the result summary, tags, and so on.
  //   // You can give the scenario any name, as long as each name in the script is unique.
  //   ui: {
  //     // Executor is a mandatory parameter for browser-based tests.
  //     // Shared iterations in this case tells k6 to reuse VUs to execute iterations.
  //     //
  //     // See https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/ for other executor types.
  //     executor: 'shared-iterations',
  //     options: {
  //       browser: {
  //         // This is a mandatory parameter that instructs k6 to launch and
  //         // connect to a chromium-based browser, and use it to run UI-based
  //         // tests.
  //         type: 'chromium',
  //       },
  //     },
  //   },
  // }
};

// The function that defines VU logic.
//
// See https://grafana.com/docs/k6/latest/examples/get-started-with-k6/ to learn more
// about authoring k6 scripts.
//
function randomDatetime() {
    const date = new Date(Date.now() - randomIntBetween(1, 30) * 24 * 60 * 60 * 1000); // Random date within the last 30 days
    return date.toISOString();
}

// Define the URL
const url = 'http://localhost/registrar';

// Generate a random payload
const payload = {
    token: randomString(8, 'abcdefghijklmnopqrstuvwxyz0123456789'), // Random 8-character string
    status: randomItem(['success', 'error']), // Randomly choose 'success' or 'error'
    message: `Random Message ${randomIntBetween(1, 100)}`, // Random message with a random number
    datetime: randomDatetime(), // Random datetime within the last 30 days
};

// Define the HTTP options
const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

// Main k6 test function
export default function () {
    // Send the POST request
    const response = http.post(url, JSON.stringify(payload), params);

    // Log the response
    console.log(`Response status code: ${response.status}`);
    console.log(`Response body: ${response.body}`);
}
