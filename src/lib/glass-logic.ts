/**
 * Converts ImageData to a data URL
 */
export const De = (imageData: ImageData): string => {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};

/**
 * Calculates the refraction offset curve
 * Exact logic from provided snippet
 */
export function gu(t = 200, e = 50, n = (o: number) => o, s = 1.5, i = 128) {
    const o = 1 / s;
    function r(a: number, l: number): [number, number] | null {
        const u = l;
        const c = 1 - o * o * (1 - u * u);
        if (c < 0) return null;
        const h = Math.sqrt(c);
        return [-(o * u + h) * a, o - (o * u + h) * l];
    }
    return Array.from({ length: i }, (a, l) => {
        const u = l / i;
        const c = n(u);
        const h = u < 1 ? 1e-4 : -1e-4;
        const d = (n(u + h) - c) / h;
        const m = Math.sqrt(d * d + 1);
        const y = [-d / m, -1 / m];
        const v = r(y[0], y[1]);
        if (v) {
            const x = c * e + t;
            return v[0] * (x / v[1]);
        } else {
            return 0;
        }
    });
}

/**
 * Bakes the displacement map into an RGBA ImageData
 * Exact logic from provided snippet
 */
export function yu(t: number, e: number, n: number, s: number, i: number, o: number, r: number, a: number[] = [], l?: number) {
    const u = l ?? (typeof window < "u" ? window.devicePixelRatio ?? 1 : 1);
    const c = t * u;
    const h = e * u;
    const f = new ImageData(c, h);
    new Uint32Array(f.data.buffer).fill(4278222976); // Alpha 255
    const m = i * u;
    const y = o * u;
    const v = m ** 2;
    const g = (m + 1) ** 2;
    const x = (m - y) ** 2;
    const p = n * u;
    const P = s * u;
    const T = p - m * 2;
    const A = P - m * 2;
    const V = (c - p) / 2;
    const b = (h - P) / 2;
    for (let M = 0; M < P; M++) {
        for (let C = 0; C < p; C++) {
            const O = ((b + M) * c + V + C) * 4;
            const q = C < m;
            const qt = C >= p - m;
            const et = M < m;
            const gt = M >= P - m;
            const yt = q ? C - m : qt ? C - m - T : 0;
            const R = et ? M - m : gt ? M - m - A : 0;
            const B = yt * yt + R * R;
            if (B <= g && B >= x) {
                const $ = B < v ? 1 : 1 - (Math.sqrt(B) - Math.sqrt(v)) / (Math.sqrt(g) - Math.sqrt(v));
                const Z = Math.sqrt(B);
                const de = m - Z;
                const Rr = yt / Z;
                const Er = R / Z;
                const Lr = (de / y * a.length) | 0;
                const Rn = a[Lr] ?? 0;
                const Fr = -Rr * Rn / r;
                const kr = -Er * Rn / r;
                f.data[O] = 128 + Fr * 127 * $;
                f.data[O + 1] = 128 + kr * 127 * $;
                f.data[O + 2] = 0;
                f.data[O + 3] = 255;
            }
        }
    }
    return f;
}

/**
 * Generates a magnifying displacement map
 * Exact logic from provided snippet
 */
export function vu(t: number, e: number) {
    const n = typeof window < "u" ? window.devicePixelRatio ?? 1 : 1;
    const s = t * n;
    const i = e * n;
    const o = new ImageData(s, i);
    const r = Math.max(s / 2, i / 2);
    for (let a = 0; a < i; a++) {
        for (let l = 0; l < s; l++) {
            const u = (a * s + l) * 4;
            const c = l - s / 2;
            const h = a - i / 2;
            const f = c / r;
            const d = h / r;
            o.data[u] = 128 - f * 127;
            o.data[u + 1] = 128 - d * 127;
            o.data[u + 2] = 0;
            o.data[u + 3] = 255;
        }
    }
    return o;
}

/**
 * Generates a specular layer ImageData
 * Exact logic from provided snippet
 */
export function xu(t: number, e: number, n: number, s: number, i: number = Math.PI / 3, o?: number, hardness: number = 2) {
    const r = o ?? (typeof window < "u" ? window.devicePixelRatio ?? 1 : 1);
    const a = t * r;
    const l = e * r;
    const u = new ImageData(a, l);
    const c = n * r;
    const h = s * r;
    const f = [Math.cos(i), Math.sin(i)];
    new Uint32Array(u.data.buffer).fill(0);
    const m = c ** 2;
    const y = (c + r) ** 2;
    const v = (c - h) ** 2;
    const g = a - c * 2;
    const x = l - c * 2;
    for (let p = 0; p < l; p++) {
        for (let P = 0; P < a; P++) {
            const T = (p * a + P) * 4;
            const A = P < c;
            const V = P >= a - c;
            const b = p < c;
            const M = p >= l - c;
            const C = A ? P - c : V ? P - c - g : 0;
            const O = b ? p - c : M ? p - c - x : 0;
            const q = C * C + O * O;
            if (q <= y && q >= v) {
                const et = Math.sqrt(q);
                const gt = c - et;
                const yt = q < m ? 1 : 1 - (et - Math.sqrt(m)) / (Math.sqrt(y) - Math.sqrt(m));
                const R = C / et;
                const B = -O / et;
                const baseSpec = Math.abs(R * f[0] + B * f[1]);
                const edgeSpec = Math.sqrt(1 - (1 - gt / (1 * r)) ** 2);
                const $ = baseSpec * Math.pow(edgeSpec, hardness);
                const Z = 255 * $;
                const de = Z * $ * yt;
                u.data[T] = Z;
                u.data[T + 1] = Z;
                u.data[T + 2] = Z;
                u.data[T + 3] = de;
            }
        }
    }
    return u;
}

export const Tu = {
  fn: (t: number) => Math.pow(1 - Math.pow(1 - t, 4), 1 / 4)
};
