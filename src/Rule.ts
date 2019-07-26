type Rule = (dp: number) => number;

export function sigmoid(beta: number = 1.0): Rule {
    if (beta < 0.0) {
        throw new RangeError(`sigmoid expects beta > 0, got ${beta}`);
    }

    return (dp: number): number => 1.0 / (1.0 + Math.exp(-beta * dp));
}

export const fermi = sigmoid;

export function heaviside(epsilon: number = 1e-3): Rule {
    if (epsilon < 0) {
        throw new RangeError(`heaviside expects epsilon > 0, got ${epsilon}`);
    }

    return (dp: number): number => {
        if (Math.abs(dp) < epsilon) {
            return 0.5;
        } else {
            return Number(dp > 0);
        }
    };
}
