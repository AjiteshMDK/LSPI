
// ClientSettings class
export class ClientSettings {
    private static _instance: ClientSettings;
    private _isFeatureFlagsCached: Boolean = false;
    private _restrictedPolicies: Set<string> = new Set();

    /**
     * Gets the instance of the ClientSettings.
     * @returns {ClientSettings} The instance of the ClientSettings.
     */
    public static getInstance(): ClientSettings {
        if (!ClientSettings._instance) {
            ClientSettings._instance = new ClientSettings();
        }
        return ClientSettings._instance;
    }

    /**
     * Caches the feature flags for the application.
     * @param {any} context The context of the application.
     * @returns {Promise<void>} A promise that resolves when the feature flags are cached.
     * @throws {Error} If there is an error fetching the feature flags.
     * @async
     */
    public async cacheFeatureFlags(context: any): Promise<void> {
        if (this._isFeatureFlagsCached) {
            return Promise.resolve();
        }

        const appId: string = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
        const featurePoliciesUrl: string = `/mobileservices/Storage/v1/runtime/application/${appId}/global/mobileservices/settingsExchange/featureVectorPolicies`;
        const params: RequestInit = { method: 'GET' };

        try {
            const response = await context.sendRequest(featurePoliciesUrl, params);
            if (response && response.statusCode === 200 && response.content) {
                const featureFlags = JSON.parse(response.content.toString());
                this._restrictedPolicies.clear();
                if (featureFlags.restrictedPolicies) {
                    featureFlags.restrictedPolicies.forEach((ff: any) => {
                        this._restrictedPolicies.add(ff.name);
                    });
                }
            } else {
                console.warn('Unexpected response while fetching feature flags:', response);
            }
        } catch (error) {
            console.error('Error occurred while fetching feature flags:', error);
        } finally {
            this._isFeatureFlagsCached = true;
            return Promise.resolve();
        }
    }

    /**
     * Checks if the feature flags are cached.
     * @returns {Boolean} True if the feature flags are cached, false otherwise.
     */
    public isFeatureFlagsCached(): Boolean {
        return this._isFeatureFlagsCached;
    }

    /**
     * Checks if a feature flag is enabled.
     * @param {string} featureFlagName The name of the feature flag to check.
     * @returns {Boolean} True if the feature flag is enabled, false otherwise.
     * @throws {Error} If feature flags are not cached.
     */
    public isFeatureFlagEnabled(featureFlagName: string): Boolean {
        if (!this._isFeatureFlagsCached) {
            throw new Error('Feature flags not cached. Call cacheFeatureFlags() first.');
        }
        return !this._restrictedPolicies.has(featureFlagName);
    }
}
