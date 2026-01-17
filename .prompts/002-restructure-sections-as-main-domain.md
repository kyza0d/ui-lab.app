<objective>
Restructure the Sections feature from a tab within the Elements domain to a standalone main navigation domain, matching the architecture of Documentation, Components, Agents & MCPs, and CLI.

Currently, Sections is a tab under Elements (alongside Starters and Assets). This causes a tab rendering pattern that's inconsistent with how other major features are structured. The goal is to make Sections a first-class citizen in the main navigation with its own sidebar context, exactly like how Documentation has tabs for Docs, Components, Design System, Agents & MCPs, and CLI.

This ensures no tab flash issues and creates a cleaner, more maintainable architecture.
</objective>

<context>
The app uses a hierarchical navigation system:

**Current Structure (Wrong)**:
- Main domains: docs, components, agents-mcps, cli, elements
- Elements domain contains tabs: elements, sections, starters, assets
- Sections shares the elements sidebar, causing inconsistency

**Target Structure (Correct)**:
- Main domains: docs, components, agents-mcps, cli, elements, sections
- Each domain has its own header type (tabs or search)
- Sections gets search header like elements
- Both elements and sections share a sidebar for unified navigation (elements nav + sections nav)

**Key Files to Review**:
- @apps/site/src/shared/lib/route-config.ts - Domain and tab configuration
- @apps/site/src/features/layout/components/header/header.tsx - Header rendering logic
- @apps/site/src/app/(main)/elements/layout.tsx - Elements feature layout
- @apps/site/src/app/(main)/sections/layout.tsx - Sections feature layout (will share ElementsSidebar)
</context>

<requirements>
1. **Domain Configuration**:
   - Add 'sections' as a DomainId type alongside 'docs', 'components', 'agents-mcps', 'cli', 'elements'
   - Create a DOMAINS entry for sections with id: 'sections', label: 'Sections', headerType: 'search' (same as elements)
   - Add sections route to ROUTES configuration with domainId: 'sections'

2. **Navigation Structure**:
   - Remove sections from TAB_GROUPS['elements'].tabs
   - Remove '/sections' from ROUTE_TAB_GROUPS
   - Both elements and sections should keep their own domain identity
   - Sidebar still shows unified "Elements | Sections" switcher (no tab group needed)

3. **Header Behavior**:
   - When on /elements or /elements/* → show search header (no tabs)
   - When on /sections or /sections/* → show search header (no tabs)
   - No tab flashing because sections is not a tab anymore, it's a domain

4. **Sidebar Integration**:
   - Keep ElementsSidebar with its "Elements | Sections" main nav switcher
   - ElementsSidebar used in both @app/(main)/elements/@sidebar and @app/(main)/sections/@sidebar
   - This maintains the unified navigation experience while treating sections as a domain

5. **Pattern Consistency**:
   - Ensure sections follows the exact same pattern as elements
   - Both should render search headers, not tabs
   - Both should use the shared sidebar
   - Route configuration should mirror each other exactly

</requirements>

<implementation>
**Step 1: Update route-config.ts**
- Add 'sections' to the DomainId type union
- Add sections to DOMAINS with headerType: 'search' and FaRegWindowMaximize icon
- Add sections to ROUTES with domainId: 'sections'
- Remove sections from TAB_GROUPS['elements'].tabs (delete the sections tab entry)
- Remove '/sections' from ROUTE_TAB_GROUPS array
- Keep ACTIVE_TAB_OVERRIDES unchanged (only has design-system override now)

**Step 2: Verify header rendering**
- The header logic in header.tsx should automatically work because:
  - getHeaderHeight(pathname) will find 'sections' domain and return default '7rem'
  - shouldShowHeaderSearch(pathname) will return true for /sections paths
  - No special handling needed since sections has headerType: 'search'

**Step 3: Ensure sidebar consistency**
- ElementsSidebar should already support both elements and sections contexts
- No changes needed to the sidebar component itself
- The getActiveNavFromPathname() function already handles /sections paths correctly

**Why This Approach**:
- Declarative: All domains are defined in one place (DOMAINS)
- No overrides: Sections naturally maps to its own domain without special cases
- No flashing: No tab matching logic needed, domain lookup is deterministic
- Scalable: New domains can be added by just adding to DOMAINS and ROUTES
- Maintainable: Elements and sections are treated identically in the routing system

**What NOT to do**:
- Don't add sections back as a tab in any TAB_GROUPS
- Don't use ACTIVE_TAB_OVERRIDES for sections
- Don't create special case logic for sections in header rendering
- All logic should flow naturally from domain configuration
</implementation>

<output>
Modify only this file:
- `./apps/site/src/shared/lib/route-config.ts` - Update domain/route configuration to treat sections as a standalone domain

The file should have:
- DomainId type includes 'sections'
- DOMAINS has a 'sections' entry with headerType: 'search'
- ROUTES has a 'sections' entry with domainId: 'sections'
- TAB_GROUPS['elements'].tabs no longer includes sections
- ROUTE_TAB_GROUPS no longer includes '/sections' entry
- All other logic remains unchanged
</output>

<verification>
Before declaring complete, verify:
1. Run `pnpm build` and confirm no TypeScript errors
2. Navigate to /sections in the app and confirm:
   - Search header displays (no tabs flash)
   - Sidebar shows "Elements | Sections" switcher
   - "Sections" is highlighted in the switcher
   - Tab bar is NOT visible (no Elements/Starters/Assets tabs appear)
3. Navigate to /elements and confirm:
   - Search header displays
   - "Elements" is highlighted in sidebar
   - Same search/filter/sort UI appears
4. Click between /elements and /sections multiple times
   - No tab flashing or re-rendering glitches
   - Smooth, clean transitions
5. Verify route behavior by checking getActiveTabForPathname('/sections')
   - Should return undefined (no tabs in sections domain)
   - Should return undefined for /elements (no tabs in elements domain either)
</verification>

<success_criteria>
✓ 'sections' is a standalone DomainId alongside docs, components, agents-mcps, cli, elements
✓ sections has its own entry in DOMAINS with headerType: 'search'
✓ sections has its own entry in ROUTES with domainId: 'sections'
✓ Sections are NOT in TAB_GROUPS['elements'].tabs
✓ '/sections' is NOT in ROUTE_TAB_GROUPS
✓ TypeScript compilation passes without errors
✓ No tab flashing when navigating to/from sections
✓ Both /elements and /sections show search headers, not tabs
✓ Sidebar shows unified "Elements | Sections" switcher on both routes
✓ Route lookup logic finds sections naturally without overrides
✓ Pattern is identical for elements and sections (both are search-based domains)
</success_criteria>
