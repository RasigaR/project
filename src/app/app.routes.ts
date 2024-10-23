import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MerchantMenuComponent } from './merchant-menu/merchant-menu.component';
import { MerchantWelcomeComponent } from './merchant-welcome/merchant-welcome.component';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'',
        component:HomeComponent},
    {path:'login',
        component:LoginComponent},
        {path:'register',
        component:RegisterComponent},
        {path:'welcome',
        component:WelcomeComponent},
        {path:'menu',
        component:MenuComponent},
        {path:'home',
        component:HomeComponent},
        {path:'checkout',
        component:CheckoutComponent},
        {path:'success',
        component:SuccessComponent},
        {path:'merchantWelcome',
        component:MerchantWelcomeComponent},
        {path:'merchantMenu',
        component:MerchantMenuComponent},
        
        {path:'add-item',
        component:AddItemComponent},
        {path:'contactUs',
        component:ContactUsComponent},
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
})
export class AppRoutingModule{}
