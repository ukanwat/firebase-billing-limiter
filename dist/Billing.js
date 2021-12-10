"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const BillingAPI_1 = require("./BillingAPI");
/**
 * Creates a PubSub functions that listen to a topic
 * registered in a GCP budget.
 * @param disableProjectAmount value that when reached, causes
 * the billing to be disabled.
 */
function createBillingPubSub({ disableProjectAmount, topicId, }) {
    return functions.pubsub
        .topic(topicId)
        .onPublish(async (message, _) => {
        let data;
        try {
            data = message.json;
        }
        catch (error) {
            console.error("PubSub message was not a JSON", error);
        }
        data &&
            console.info(`Successfully received PubSub Billing for ${data.budgetDisplayName}`);
        if (data.costAmount >= disableProjectAmount) {
            console.log(`Trying to disable billing...: cost ${data.costAmount}`);
            await BillingAPI_1.disableBilling();
        }
        return null;
    });
}
exports.default = createBillingPubSub;
//# sourceMappingURL=Billing.js.map