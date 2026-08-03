import {
  CommunityResourcesShell,
  resourceTypeOptions,
  mockResources,
} from "@/features/communities/community-resources";

export default function CommunityResourcesPage() {
  // TODO: Replace with Express API integration — GET /api/communities/:slug/resources
  return <CommunityResourcesShell resourceTypes={resourceTypeOptions} resources={mockResources} />;
}