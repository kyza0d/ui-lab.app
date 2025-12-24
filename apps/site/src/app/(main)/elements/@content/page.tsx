import { BreadcrumbsNav } from '@/components/layout/BreadcrumbsNav';
import { ElementsGridClient } from '@/components/elements/ElementsGridClient';
import { elementsList, getAllCategories, getAllTags, searchElements } from 'ui-lab-registry';

interface ElementsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    tags?: string;
  }>;
}

export default async function ElementsPage({ searchParams }: ElementsPageProps) {
  const params = await searchParams;
  const searchQuery = params.q || '';
  const selectedCategoryParam = params.category || null;
  const selectedTagsParam = params.tags?.split(',').filter(Boolean) || [];
  const categories = getAllCategories();
  const tags = getAllTags();

  const validSelectedCategory =
    selectedCategoryParam && categories.includes(selectedCategoryParam)
      ? selectedCategoryParam
      : null;

  const validSelectedTags = selectedTagsParam.filter((tag) => tags.includes(tag));

  let filteredElements = elementsList;

  if (searchQuery.trim()) {
    filteredElements = searchElements(searchQuery);
  }

  if (validSelectedCategory) {
    filteredElements = filteredElements.filter((el) => el.category === validSelectedCategory);
  }

  if (validSelectedTags.length > 0) {
    filteredElements = filteredElements.filter((el) =>
      validSelectedTags.some((tag) => el.tags.includes(tag))
    );
  }

  return (
    <div className='pt-60 max-w-4xl mx-auto '>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 mx-auto pb-12">
        <div className="space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-foreground-50">Elements</h2>
          <p className="text-foreground-400 max-w-2xl">
            Copy-paste ready UI elements built with UI Lab components. Click any element to view all variants and code.
          </p>
        </div>

        <ElementsGridClient elements={filteredElements} />
      </div>
    </div>
  );
}
