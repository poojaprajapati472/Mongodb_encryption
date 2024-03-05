export interface SubscriptionDetail {
        subscriptionId: string;
        subscriptionName: string;
    }
export interface User {
        name?: string;
        email?: string;
        password?: string;
        phoneNo?: string;
        username?: string;
        subscriptionDetail?: SubscriptionDetail;
    }
