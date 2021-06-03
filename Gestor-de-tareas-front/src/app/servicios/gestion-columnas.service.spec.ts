import { TestBed } from '@angular/core/testing';

import { GestionColumnasService } from './gestion-columnas.service';

describe('GestionColumnasService', () => {
  let service: GestionColumnasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionColumnasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
