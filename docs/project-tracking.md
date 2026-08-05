# GitHub-owner project tracking

This document keeps repository work synchronized with the canonical Linear project for the GitHub owner.

## ORESoftware tracking map

| System | Record |
| --- | --- |
| Public site | <https://oresoftware.github.io> |
| GitHub repository | <https://github.com/ORESoftware/oresoftware.github.io> |
| Ongoing GitHub ticket | [Issue #6 — Track ORESoftware Pages catalog and per-organization metadata](https://github.com/ORESoftware/oresoftware.github.io/issues/6) |
| Astro delivery PR | [PR #3 — Rebuild the ORESoftware Pages site with Astro](https://github.com/ORESoftware/oresoftware.github.io/pull/3) |
| Linear owner project | [github.com/ORESoftware](https://linear.app/denman/project/githubcomoresoftware-1574ce77fadf) |
| Linear delivery issue | [DEN-2128 — Rebuild ORESoftware Pages site with Astro](https://linear.app/denman/issue/DEN-2128/rebuild-oresoftware-pages-site-with-astro) |
| Linear runbook | [ORESoftware Pages — Astro architecture and GitHub-owner operations](https://linear.app/denman/document/oresoftware-pages-astro-architecture-and-github-owner-operations-dbd362a07834) |

## Owner-level standard

For every GitHub owner or organization that has active engineering work, use the following tracking pattern:

1. Maintain one canonical Linear project named `github.com/<owner>`.
2. Maintain one GitHub repository-level issue for the public site, owner documentation, or cross-repository backlog.
3. Link implementation issues and pull requests to both records.
4. Put durable architecture and operating decisions in repository documentation and a Linear document.
5. Publish a Linear project status update after material launches, migrations, or fleet-wide policy changes.
6. Keep the GitHub issue open for ongoing maintenance; close only implementation-specific child issues.

## Current launch evidence

- The Pages implementation is Astro-based, not Jekyll or Hugo.
- The desktop catalog is a three-column grid with responsive tablet and mobile layouts.
- The existing ORESoftware banner is centered and constrained to prevent horizontal scrolling.
- Four popular repositories are linked: `live-mutex`, `sumanjs`, `flags-2-env`, and `r2g`.
- Twenty-two organization cards are present, including `usa-acc`.
- The header includes dropdown navigation and the footer links to `the1mills.github.io`.
- GitHub Actions validates and builds the site before publication.

## Maintenance ownership

GitHub issue #6 is the authoritative repository backlog for catalog accuracy, organization-link verification, project positioning, responsive behavior, and future card additions.

DEN-2128 records the completed launch. New material follow-up work should normally be created as a separate Linear issue inside `github.com/ORESoftware`, then linked from issue #6 or a dedicated GitHub child issue.
