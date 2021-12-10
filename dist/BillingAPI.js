"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableBilling = void 0;
const googleapis_1 = require("googleapis");
const google_auth_library_1 = require("google-auth-library");
const PROJECT_ID = process.env.GCLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const apiBilling = googleapis_1.google.cloudbilling("v1").projects;
async function disableBilling() {
    setCredentialsForBilling();
    if (PROJECT_NAME) {
        const { data } = await getBillingInfo();
        if (data.billingEnabled) {
            await apiBilling.updateBillingInfo({
                name: PROJECT_NAME,
                requestBody: { billingAccountName: "" },
            });
            console.warn(`Billing disabled for project: ${PROJECT_NAME}!`);
        }
        else {
            console.info(`Billing already disabled`);
        }
    }
}
exports.disableBilling = disableBilling;
async function getBillingInfo() {
    const billingInfo = await apiBilling.getBillingInfo({
        name: PROJECT_NAME,
    });
    return billingInfo;
}
function setCredentialsForBilling() {
    const client = new google_auth_library_1.GoogleAuth({
        scopes: [
            "https://www.googleapis.com/auth/cloud-billing",
            "https://www.googleapis.com/auth/cloud-platform",
        ],
    });
    googleapis_1.google.options({
        auth: client,
    });
}
//# sourceMappingURL=BillingAPI.js.map