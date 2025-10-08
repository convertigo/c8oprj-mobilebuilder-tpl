import { Injectable, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({providedIn: 'root'})
export class NavParams {
  /** Public like Ionic 3 */
  public data: Record<string, any> = {};

  constructor(@Optional() private route?: ActivatedRoute) {
	
	let getRouteParams = function(route: ActivatedRoute) {
		let params = {}
		Object.assign(params, route.snapshot.params)
		Object.assign(params, route.snapshot.queryParams)
		return params
	}
	
    // Sync access for routed pages (constructor-safe)
    if (this.route) {
		this.data = getRouteParams(this.route)
		this.route.queryParams.subscribe(params => {
			this.data = getRouteParams(this.route);
		});
    }
  }

  /** Old Ionic API */
  get(key: string): any {
    return this.data?.[key];
  }

  /** Internal: used by overlay wrapper to seed synchronously */
  _prime(from: Record<string, any> | null | undefined): void {
    this.data = { ...(from || {}) };
  }
}
