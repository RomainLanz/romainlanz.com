import { csrfField, route } from '#start/view';
import { Admin } from '#views/layouts/admin';
import { Form } from '#views/components/form/form';
import { Button } from '#views/components/button';
import type { ArticleByIdQueryResult } from '#articles/repositories/article_repository';
import type { CategoryListQueryResult } from '#categories/repositories/category_repository';

interface UpdateProps {
	article: ArticleByIdQueryResult;
	categories: CategoryListQueryResult;
}

export function Update(props: UpdateProps) {
	const { article, categories } = props;

	const categoriesOptions = categories.map((category) => ({
		value: category.id,
		label: category.name,
	}));

	return (
		<Admin title="Édition de l'article">
			<div class="card">
				<form
					class="stack"
					action={route('admin.articles.update', [article.id], { qs: { _method: 'PUT' } })}
					method="post"
				>
					{csrfField()}

					<Form.Group>
						<Form.Label title="Titre *" for="title" />
						<Form.Input name="title" value={article.title} />
					</Form.Group>

					<Form.Group>
						<Form.Label title="Canonical URL" for="canonicalUrl" />
						<Form.Input name="canonicalUrl" value={article.slug} />
					</Form.Group>

					<Form.Group>
						<Form.Label title="Catégorie *" for="categoryId" />
						<Form.Select name="categoryId" options={categoriesOptions} selected={article.category_id} />
					</Form.Group>

					<Form.Group>
						<Form.Label title="Contenu *" for="content" />
						<Form.EasyMDE name="markdownContent" defaultValue={article.markdown_content} />
					</Form.Group>

					<div>
						<Button color="violet" type="submit">
							Modifier
						</Button>
					</div>
				</form>
			</div>
		</Admin>
	);
}
