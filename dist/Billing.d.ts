import * as functions from "firebase-functions";
import { BillingLimiterParams } from "./ts";
/**
 * Creates a PubSub functions that listen to a topic
 * registered in a GCP budget.
 * @param disableProjectAmount value that when reached, causes
 * the billing to be disabled.
 */
export default function createBillingPubSub({ disableProjectAmount, topicId, }: BillingLimiterParams): functions.CloudFunction<functions.pubsub.Message>;
