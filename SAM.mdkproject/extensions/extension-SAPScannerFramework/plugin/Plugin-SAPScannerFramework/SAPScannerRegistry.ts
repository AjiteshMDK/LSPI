
import { SAPScanner } from "./SAPScannerFramework";

// Singleton class to manage the SAP scanners
export class SAPScannerRegistry {
    private static _instance: SAPScannerRegistry;
    private _scanners: Map<number, SAPScanner> = new Map();
    private _defaultScannerId: number | undefined;
    private _nextScannerId: number = 1;

    private constructor() {}

    /**
     * Returns the singleton instance of the SAPScannerRegistry.
     * @return {SAPScannerRegistry} The singleton instance of the SAPScannerRegistry.
     */
    public static getInstance(): SAPScannerRegistry {
        if (!SAPScannerRegistry._instance) {
            SAPScannerRegistry._instance = new SAPScannerRegistry();
        }
        return SAPScannerRegistry._instance;
    }

    /**
     * Registers a scanner with the registry.
     * @param {SAPScanner} scannerImpl Scanner implementation to register.
     * @return {number} ID of the registered scanner.
     */
    public registerScanner(scannerImpl: SAPScanner): number {
        const id = this._nextScannerId++;
        this._scanners.set(id, scannerImpl);
        return id;
    }

    /**
     * Unregisters a scanner with the registry.
     * @param {number} id ID of the scanner to unregister.
     */
    public unregisterScanner(id: number | undefined): void {
        if (id && this._scanners.has(id)) {
            this._scanners.delete(id);
        }
        if (this._defaultScannerId === id) {
            this._defaultScannerId = undefined;
        }
    }

    /**
     * Sets the default scanner to use.
     * @param {number} id ID of the scanner to set as default.
     * @return {boolean} True if the default scanner was set, false otherwise.
     */
    public setDefaultScanner(id: number): boolean {
        if (this._scanners.has(id)) {
            this._defaultScannerId = id;
            return true;
        }
        return false;
    }

    /**
     * Returns the default scanner.
     * @return {SAPScanner} The default scanner.
     */
    public getDefaultScanner(): SAPScanner | undefined {
        if (!this._defaultScannerId) {
            return undefined;
        }
        return this._scanners.get(this._defaultScannerId);
    }

    /**
     * Returns the ID of the default scanner.
     * @return {number} ID of the default scanner.
     */
    public getDefaultScannerId(): number | undefined {
        return this._defaultScannerId;
    }

    /**
     * Returns the scanner with the given ID.
     * @param {number} id ID of the scanner to get.
     * @return {SAPScanner} The scanner with the given ID.
     */
    public getScannerById(id: number | undefined): SAPScanner | undefined {
        if (!id || !this._scanners.has(id)) {
            return undefined;
        }
        return this._scanners.get(id!);
    }
}
