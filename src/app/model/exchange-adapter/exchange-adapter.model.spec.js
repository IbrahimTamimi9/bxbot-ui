"use strict";
var exchange_adapter_model_1 = require("./exchange-adapter.model");
/**
 * Tests the Exchange Adapter model behaves as expected.
 *
 * @author gazbert
 */
describe('Exchange Adapter model tests', function () {
    it('should have correct initial values', function () {
        var exchangeAdapter = new exchange_adapter_model_1.ExchangeAdapter('gdax', 'GDAX', 'com.gazbert.bxbot.exchanges.GdaxExchangeAdapter', 1, new exchange_adapter_model_1.NetworkConfig(60, [
            503,
            504,
            522,
        ], [
            "Connection reset",
            "Connection refused",
            "Remote host closed connection during handshake"
        ]));
        expect(exchangeAdapter.id).toBe('gdax');
        expect(exchangeAdapter.name).toBe('GDAX');
        expect(exchangeAdapter.className).toBe('com.gazbert.bxbot.exchanges.GdaxExchangeAdapter');
        expect(exchangeAdapter.networkConfig.connectionTimeout).toBe(60);
        expect(exchangeAdapter.networkConfig.nonFatalErrorHttpStatusCodes[0]).toBe(503);
        expect(exchangeAdapter.networkConfig.nonFatalErrorHttpStatusCodes[1]).toBe(504);
        expect(exchangeAdapter.networkConfig.nonFatalErrorHttpStatusCodes[2]).toBe(522);
        expect(exchangeAdapter.networkConfig.nonFatalErrorMessages[0]).toBe("Connection reset");
        expect(exchangeAdapter.networkConfig.nonFatalErrorMessages[1]).toBe("Connection refused");
        expect(exchangeAdapter.networkConfig.nonFatalErrorMessages[2]).toBe("Remote host closed connection during handshake");
    });
    it('should clone itself', function () {
        var exchangeAdapter = new exchange_adapter_model_1.ExchangeAdapter('btce', 'BTC-e', 'com.gazbert.bxbot.exchanges.BtceExchangeAdapter', 1, new exchange_adapter_model_1.NetworkConfig(60, [
            503,
            504,
            522,
        ], [
            "Connection reset",
            "Connection refused",
            "Remote host closed connection during handshake"
        ]));
        var clone = exchangeAdapter.clone();
        expect(exchangeAdapter).toEqual(clone);
    });
});
//# sourceMappingURL=exchange-adapter.model.spec.js.map