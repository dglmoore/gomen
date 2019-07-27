import * as Gomen from '../src';

test('Exposes Arena', function() {
    expect(Gomen.Arena).toBeDefined();
});

test('Exposes Graph', function() {
    expect(Gomen.Graph).toBeDefined();
});

test('Exposes Rule', function() {
    expect(Gomen.Rule).toBeDefined();
});

test('Exposes Scheme', function() {
    expect(Gomen.Scheme).toBeDefined();
});

test('Exposes TwoPlayerGame', function() {
    expect(Gomen.TwoPlayerGame).toBeDefined();
});
