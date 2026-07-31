import router from '@adonisjs/core/services/router';

const HealthChecksController = () => import('#app/core/controllers/health_checks_controller');

router.get('/healthz', [HealthChecksController]).as('healthz');
