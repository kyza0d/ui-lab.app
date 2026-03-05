import fs from 'fs';
import matter from 'gray-matter';

interface FileItem {
  fullPath: string;
  slug: string;
}

export async function extractMetadata(
  filePath: string,
  slug: string,
  domain: string
) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    return {
      title: data.title || slugToTitle(slug),
      description: data.description || '',
      category: data.category || null,
      order: data.order ?? 999,
      slug,
      domain,
    };
  } catch (error: any) {
    console.error(`Error extracting metadata from ${filePath}:`, error.message);
    return null;
  }
}

export async function extractAllMetadata(files: FileItem[], domain: string) {
  const metadataPromises = files.map(file =>
    extractMetadata(file.fullPath, file.slug, domain)
  );

  const metadata = await Promise.all(metadataPromises);
  return metadata.filter(m => m !== null);
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
