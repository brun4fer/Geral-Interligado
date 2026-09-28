import assert from "node:assert/strict";
import test from "node:test";

import { pkceChallenge, safePortalReturnPath, secureSecretEqual, validPkceValue } from "@/lib/sso";

test("only accepts local portal return paths", () => {
  assert.equal(safePortalReturnPath("/api/sso/authorize?client_id=test"), "/api/sso/authorize?client_id=test");
  assert.equal(safePortalReturnPath("https://attacker.example"), "/");
  assert.equal(safePortalReturnPath("//attacker.example"), "/");
  assert.equal(safePortalReturnPath("/\\attacker.example"), "/");
});

test("validates PKCE values and produces a stable S256 challenge", () => {
  const verifier = "a".repeat(43);
  assert.equal(validPkceValue(verifier), true);
  assert.equal(validPkceValue("short"), false);
  assert.equal(pkceChallenge(verifier), pkceChallenge(verifier));
  assert.notEqual(pkceChallenge(verifier), pkceChallenge("b".repeat(43)));
});

test("compares client secrets without accepting empty or different values", () => {
  assert.equal(secureSecretEqual("shared-secret", "shared-secret"), true);
  assert.equal(secureSecretEqual("shared-secret", "other-secret"), false);
  assert.equal(secureSecretEqual("", ""), false);
});
