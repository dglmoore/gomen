const { Rule } = require('../main.js');

test('sigmoid throws on invalid beta', function() {
    expect(() => Rule.sigmoid('a')).toThrow(TypeError);
    expect(() => Rule.sigmoid([1,2,3])).toThrow(TypeError);
    expect(() => Rule.sigmoid(-1)).toThrow(RangeError);
});

test('sigmoid with default argument', function() {
    const r = Rule.sigmoid();
    expect(r(0)).toBe(0.5);
    expect(r(1.0)).toBe(Math.E / (1 + Math.E));
    expect(r(-1.0)).toBe(1 / (1 + Math.E));
});

test.each`
    beta   | dp      | prob
    ${0.5} | ${0}    | ${0.5}
    ${0.5} | ${1.0}  | ${Math.sqrt(Math.E) / (1 + Math.sqrt(Math.E))}
    ${0.5} | ${-1.0} | ${1 / (1 + Math.sqrt(Math.E))}
`('sigmoid($beta)($dp) is $prob', function({ beta, dp, prob}) {
    expect(Rule.sigmoid(beta)(dp)).toBe(prob);
});

test('fermi throws on invalid beta', function() {
    expect(() => Rule.fermi('a')).toThrow(TypeError);
    expect(() => Rule.fermi([1,2,3])).toThrow(TypeError);
    expect(() => Rule.fermi(-1)).toThrow(RangeError);
});

test('fermi with default argument', function() {
    const r = Rule.fermi();
    expect(r(0)).toBe(0.5);
    expect(r(1.0)).toBe(Math.E / (1 + Math.E));
    expect(r(-1.0)).toBe(1 / (1 + Math.E));
});

test.each`
    beta   | dp      | prob
    ${0.5} | ${0}    | ${0.5}
    ${0.5} | ${1.0}  | ${Math.sqrt(Math.E) / (1 + Math.sqrt(Math.E))}
    ${0.5} | ${-1.0} | ${1 / (1 + Math.sqrt(Math.E))}
`('fermi($beta)($dp) is $prob', function({ beta, dp, prob}) {
    expect(Rule.fermi(beta)(dp)).toBe(prob);
});

test('heaviside throws on invalid heaviside', function() {
    expect(() => Rule.heaviside('a')).toThrow(TypeError);
    expect(() => Rule.heaviside([1,2,3])).toThrow(TypeError);
    expect(() => Rule.heaviside(-1)).toThrow(RangeError);
});

test('heaviside with default argument', function() {
    const r = Rule.heaviside();
    expect(r(-1e-4)).toBe(0.5);
    expect(r( 0)).toBe(0.5);
    expect(r( 1e-4)).toBe(0.5);

    expect(r(-1e-3)).toBe(0.0);
    expect(r(-1)).toBe(0.0);

    expect(r(1e-3)).toBe(1.0);
    expect(r(1)).toBe(1.0);
});

test.each`
    epsilon | dp      | prob
    ${0.1}  | ${-1.00} | ${0.0}
    ${0.1}  | ${-0.10} | ${0.0}
    ${0.1}  | ${-0.05} | ${0.5}
    ${0.1}  | ${ 0.00} | ${0.5}
    ${0.1}  | ${ 0.05} | ${0.5}
    ${0.1}  | ${ 0.10} | ${1.0}
    ${0.1}  | ${ 1.00} | ${1.0}
    ${1.0}  | ${-2.00} | ${0.0}
    ${1.0}  | ${-1.00} | ${0.0}
    ${1.0}  | ${-0.90} | ${0.5}
    ${1.0}  | ${ 0.00} | ${0.5}
    ${1.0}  | ${ 0.90} | ${0.5}
    ${1.0}  | ${ 1.00} | ${1.0}
    ${1.0}  | ${ 2.00} | ${1.0}
`('heaviside($epsilon)($dp) is $prob', function({ epsilon, dp, prob}) {
    expect(Rule.heaviside(epsilon)(dp)).toBe(prob);
});
