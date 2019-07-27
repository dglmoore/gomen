import { Scheme } from './Scheme';
import TwoPlayerGame from './TwoPlayerGame';
import { random, RNG, Space } from './Util';

const is = require('is');

export interface PlaySpec {
    rounds: number;
    exhaustive?: boolean;
    replicates?: number;
    rng?: RNG;
}

export default class Arena {
    public game: TwoPlayerGame;
    public graph: any;
    public scheme: Scheme;

    constructor(game: TwoPlayerGame, graph: any, scheme: Scheme) {
        if (graph.order() === 0) {
            throw new Error('graph is empty');
        } else if (Array.from(graph.degree().values()).includes(0)) {
            throw new Error('graph has a disconnected node');
        }

        this.game = game;
        this.graph = graph;
        this.scheme = scheme;
    }

    public size(): number {
        return this.graph.order();
    }

    public payoffs(ss: number[]): number[][] {
        if (ss.length !== this.size()) {
            const msg = 'strategies must have same size as arena';
            const res = `expected ${this.size()}, got ${ss.length}`;
            throw new RangeError(`${msg}; ${res}`);
        }
        const size = this.size();
        const payoffs = new Array(size);
        for (let i = 0; i < size; ++i) {
            payoffs[i] = [0, 0];
            for (const j of this.graph.neighbors(i)) {
                for (let s = 0; s < 2; ++s) {
                    payoffs[i][s] += this.game.getPayoff(s, ss[j]);
                }
            }
        }
        return payoffs;
    }

    public round(ss: number[], rng?: RNG): number[] {
        return this.scheme(this.graph, ss, this.payoffs(ss), rng);
    }

    public play({ rounds, exhaustive, replicates, rng }: PlaySpec): number[][] {
        if (!is.integer(rounds)) {
            throw new Error('number of rounds is not an integer');
        } else if (is.lt(rounds, 1)) {
            throw new Error('number of rounds is less than 1');
        }
        if (is.defined(replicates)) {
            if (!is.integer(replicates)) {
                throw new Error('number of replicates is not an integer');
            } else if (is.lt(replicates, 1)) {
                throw new Error('number of replicates is less than 1');
            }
        }
        if (exhaustive) {
            const space = new Space(this.graph.order());
            const series = new Array(space.volume);
            let i = 0;
            for (const init of space) {
                series[i] = new Array(rounds);
                series[i][0] = init;
                for (let r = 0; r < rounds; ++r) {
                    series[i][r + 1] = this.round(series[i][r], rng);
                }
                ++i;
            }
            return series;
        } else if (replicates === undefined) {
            const gen = rng ? (): number => rng.int(0, 1) : (): number => random.int(0, 1);
            const series = new Array(rounds);
            series[0] = new Array(this.graph.order()).fill(0).map(gen);
            for (let r = 0; r < rounds; ++r) {
                series[r + 1] = this.round(series[r], rng);
            }
            return series;
        } else {
            const series = new Array(replicates);
            for (let r = 0; r < replicates; ++r) {
                series[r] = this.play({ rounds, rng });
            }
            return series;
        }
    }
}
