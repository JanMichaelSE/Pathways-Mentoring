function getJWTExpireDate(jwtToken) {
  if (jwtToken) {
    try {
      const [, payload] = jwtToken.split(".");
      const { exp: expires } = JSON.parse(window.atob(payload));
      if (typeof expires === "number") {
        return new Date(expires * 1000);
      }
    } catch {
      // ignore
    }
  }
  return null;
}

export { getJWTExpireDate };
