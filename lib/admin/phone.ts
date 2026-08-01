import "server-only";

/** ASCII·전각 숫자만 남김 */
export function normalizePhone(input: string): string {
  return input
    .normalize("NFKC")
    .replace(/\D/g, "");
}

/**
 * 앞·중간·뒤를 이어 붙입니다.
 * 첫 칸에 번호 전체를 붙여넣은 경우(10~11자리)도 허용합니다.
 */
export function joinPhoneParts(
  front: string,
  middle: string,
  back: string,
): string {
  const f = normalizePhone(front);
  const m = normalizePhone(middle);
  const b = normalizePhone(back);

  if (f.length >= 10 && m.length === 0 && b.length === 0) {
    return f;
  }

  return `${f}${m}${b}`;
}

/**
 * 한국 휴대폰: 010/011/016/017/018/019 + 7~8자리 = 총 10~11자리
 * 예) 01012345678, 0101234567
 */
export function isValidKrMobile(phoneDigits: string): boolean {
  const d = normalizePhone(phoneDigits);
  return /^01[016789]\d{7,8}$/.test(d);
}

export function phoneValidationHint(phoneDigits: string): string {
  const d = normalizePhone(phoneDigits);
  if (!d) {
    return "숫자가 인식되지 않았습니다. 010-1234-5678 형식으로 입력해 주세요.";
  }
  if (d.length < 10 || d.length > 11) {
    return `숫자 ${d.length}자리로 인식되었습니다. 010-1234-5678 (10~11자리)로 입력해 주세요.`;
  }
  if (!d.startsWith("01")) {
    return "휴대폰 번호는 01으로 시작해야 합니다.";
  }
  if (!/^01[016789]/.test(d)) {
    return "지원 번호: 010, 011, 016, 017, 018, 019";
  }
  return "휴대폰 번호를 앞·중간·뒤로 나눠 정확히 입력해 주세요.";
}

export function maskPhone(phoneDigits: string): string {
  const d = normalizePhone(phoneDigits);
  if (d.length < 7) return "****";
  return `${d.slice(0, 3)}****${d.slice(-4)}`;
}
