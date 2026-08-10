export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // separate accents from letters
    .replace(/[\u0300-\u036f]/g, '') // remove all accents
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd') // replace đ
    .replace(/[^a-z0-9- ]/g, '') // replace non-alphanumeric with dash
    .trim()
    .replace(/\s+/g, '-') // replace spaces with dashes
    .replace(/-+/g, '-'); // replace multiple dashes with single dash
}
