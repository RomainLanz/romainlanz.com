import { csrfField, route, space } from '#start/view';
import { Form } from '#views/components/form/form';
import { Button } from '#views/components/button';
import { Admin } from '#views/layouts/admin';
import type { CategoryListQueryResult } from '#categories/repositories/category_repository';

interface CreateProps {
	categories: CategoryListQueryResult;
}

export function Create(props: CreateProps) {
	const { categories } = props;

	const categoriesOptions = categories.map((category) => ({
		value: category.id,
		label: category.name,
	}));

	return (
		<Admin title="Création d'article">
			<div class="card">
				<form
					class="stack"
					action={route('admin.articles.store')}
					method="post"
					style={{
						['--gap' as any]: space(3),
					}}
				>
					{csrfField()}

					<Form.Group>
						<Form.Label title="Titre *" for="title" />
						<Form.Input name="title" />
					</Form.Group>

					<Form.Group>
						<Form.Label title="Canonical URL" for="canonicalUrl" />
						<Form.Input name="canonicalUrl" />
					</Form.Group>

					<Form.Group>
						<Form.Label title="Description *" for="description" />
						<Form.Input name="description" />
					</Form.Group>

					<Form.Group>
						<Form.Label title="Catégorie *" for="categoryId" />
						<Form.Select name="categoryId" options={categoriesOptions} />
					</Form.Group>

					<Form.Group>
						<Form.Label title="Contenu *" for="content" />
						<Form.EasyMDE name="markdownContent" />
					</Form.Group>

					<div>
						<Button color="violet" type="submit">
							Créer
						</Button>
					</div>
				</form>
			</div>
		</Admin>
	);
}
