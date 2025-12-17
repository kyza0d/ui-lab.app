import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface DocMetadata {
  id: string;
  title: string;
  description?: string;
  category?: string;
}

interface DocumentationSection {
  label: string;
  items: Array<{
    id: string;
    label: string;
  }>;
}

const DOCS_DIR = path.join(process.cwd(), 'apps/site/content/docs');

const CATEGORY_ORDER: Record<string, number> = {
  'Getting Started': 0,
  'Development': 1,
  'Architecture': 2,
  'Advanced': 3,
};

const CATEGORY_LABELS: Record<string, string> = {
  'guides': 'Documentation',
};

function getCategoryLabel(category: string | undefined): string {
  if (!category) return 'Documentation';
  return CATEGORY_LABELS[category] || category;
}

function getDocMetadata(filePath: string): DocMetadata | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    const filename = path.basename(filePath, '.mdx');

    if (filename === 'index' || filename === 'installation') {
      return null; // Skip index and installation in the registry
    }

    return {
      id: filename,
      title: data.title || filename,
      description: data.description,
      category: data.category || 'guides',
    };
  } catch (error) {
    console.error(`Error reading doc metadata from ${filePath}:`, error);
    return null;
  }
}

function groupByCategory(docs: DocMetadata[]): Record<string, DocMetadata[]> {
  return docs.reduce(
    (acc, doc) => {
      const category = doc.category || 'guides';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(doc);
      return acc;
    },
    {} as Record<string, DocMetadata[]>
  );
}

export function getDocumentationSections(): DocumentationSection[] {
  try {
    if (!fs.existsSync(DOCS_DIR)) {
      console.warn('Documentation directory not found:', DOCS_DIR);
      return [];
    }

    const files = fs.readdirSync(DOCS_DIR).filter((file) => file.endsWith('.mdx'));
    const docs = files
      .map((file) => getDocMetadata(path.join(DOCS_DIR, file)))
      .filter((doc) => doc !== null) as DocMetadata[];

    // Group by category
    const grouped = groupByCategory(docs);

    // Define section organization
    const sections: DocumentationSection[] = [];

    // Getting Started section
    const gettingStartedDocs = docs.filter((doc) =>
      ['installation', 'getting-started'].includes(doc.id)
    );
    if (gettingStartedDocs.length > 0) {
      sections.push({
        label: 'Getting Started',
        items: [
          { id: 'introduction', label: 'Introduction' },
          { id: 'installation', label: 'Installation' },
          { id: 'getting-started', label: 'Getting Started' },
        ].filter((item) =>
          docs.some((doc) => doc.id === item.id) || item.id === 'introduction'
        ),
      });
    }

    // Development section (styling, best-practices, cli-guide)
    const developmentDocs = docs.filter((doc) =>
      ['styling', 'best-practices', 'cli-guide'].includes(doc.id)
    );
    if (developmentDocs.length > 0) {
      sections.push({
        label: 'Development',
        items: developmentDocs
          .sort((a, b) => {
            const order = ['cli-guide', 'styling', 'best-practices'];
            return order.indexOf(a.id) - order.indexOf(b.id);
          })
          .map((doc) => ({
            id: doc.id,
            label: doc.title,
          })),
      });
    }

    // Architecture & Advanced section
    const advancedDocs = docs.filter((doc) =>
      ['architecture', 'advanced'].includes(doc.id)
    );
    if (advancedDocs.length > 0) {
      sections.push({
        label: 'Advanced',
        items: advancedDocs
          .sort((a, b) => {
            const order = ['architecture', 'advanced'];
            return order.indexOf(a.id) - order.indexOf(b.id);
          })
          .map((doc) => ({
            id: doc.id,
            label: doc.title,
          })),
      });
    }

    return sections;
  } catch (error) {
    console.error('Error generating documentation sections:', error);
    return [];
  }
}
