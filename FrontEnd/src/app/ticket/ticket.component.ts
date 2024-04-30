import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  lastResult: any = {
    id: '',
    amount_cents: '',
    order: '',
    created_at: '',
    currency: '',
    updated_at: '',
    source_data_type: '',
    source_data_sub_type: '',
  };
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // id=180900606&pending=false&amount_cents=100&success=false&is_auth=false&is_capture=false&is_standalone_payment=true&is_voided=false&is_refunded=false&is_3d_secure=false&integration_id=4564810&profile_id=973666&has_parent_transaction=false&order=205370537&created_at=2024-04-30T05:17:12.836310&currency=EGP&merchant_commission=0&discount_details=%5B%5D&is_void=false&is_refund=false&error_occured=true&refunded_amount_cents=0&captured_amount=0&updated_at=2024-04-30T05:17:12.876098&is_settled=false&bill_balanced=false&is_bill=false&owner=1784016&source_data_type=card&source_data_pan=2346&source_data_sub_type=MasterCard&hmac=40e7df6accab229b8780d43fedae0bef12aeaaffdd60c5ee35cf07638acb8cb66d4b739d8f828f1e23db369196074cb990bd4833c7c813b21348b7d380fc0a60
    this.route.queryParamMap.subscribe((params) => {
      this.lastResult.id = params.get('id');
      this.lastResult.amount_cents = params.get('amount_cents');
      this.lastResult.order = params.get('order');
      this.lastResult.created_at = params.get('created_at');
      this.lastResult.currency = params.get('currency');
      this.lastResult.updated_at = params.get('updated_at');
      this.lastResult.source_data_type = params.get('source_data_type');
      this.lastResult.source_data_sub_type = params.get('source_data_sub_type');
    });
console.log(this.lastResult)
    // }
  }
}
