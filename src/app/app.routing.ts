import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'example'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)},
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)},
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
            {path: 'publicacoes', loadChildren: () => import('app/modules/publicacoes/publicacoes.module').then(m => m.PublicacoesModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'acervo', loadChildren: () => import('app/modules/acervo/acervo.module').then(m => m.AcervoModule)},
            {path: 'resposta-solicitacao-sessao-extraordinaria', loadChildren: () => import('app/modules/sessao-extraordinaria/resposta-solicitacao-sessao-extraordinaria/resposta-solicitacao-sessao-extraordinaria.module').then(m => m.JulgamentoExtraordinarioModule)},
            {path: 'sessao-extraordinaria', loadChildren: () => import('app/modules/sessao-extraordinaria/sessao-extraordinaria.module').then(m => m.SessaoExtraordinariaModule)},
            {path: 'criacao-colegiado', loadChildren: () => import('app/modules/criacao-colegiado/criacao-colegiado.module').then(m => m.CriacaoColegiadoModule)},
            {path: 'sessoes-julgamento', loadChildren: () => import('app/modules/sessoes-julgamentos/sessoes-julgamentos.module').then(m => m.SessoesJulgamentosModule)},
            {path: 'resultado-julgamento', loadChildren: () => import('app/modules/resultado-julgamento/resultado-julgamento.module').then(m => m.ResultadoJulgamentoModule)},
            {path: 'informar-redator', loadChildren: ()=> import('app/modules/informar-redator/informar-redator.module').then(m => m.InformarRedatorModule)},
        ]
    }
];
