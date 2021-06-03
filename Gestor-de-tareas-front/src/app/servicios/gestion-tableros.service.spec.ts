import { TestBed } from '@angular/core/testing';

import { GestionTablerosService } from './gestion-tableros.service';

describe('GestionTablerosService', () => {
  let service: GestionTablerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionTablerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
