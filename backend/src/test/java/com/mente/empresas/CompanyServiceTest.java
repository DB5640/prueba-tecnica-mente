package com.mente.empresas;

import com.mente.empresas.dto.CompanyDTO;
import com.mente.empresas.entity.Company;
import com.mente.empresas.repository.CompanyRepository;
import com.mente.empresas.service.CompanyService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CompanyServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private CompanyService companyService;

    private CompanyDTO companyDTO;
    private Company company;

    @BeforeEach
    void setUp() {
        companyDTO = new CompanyDTO();
        companyDTO.setName("Test Company");
        companyDTO.setNit("123456789");
        companyDTO.setAddress("Test Address");
        companyDTO.setPhone("555-1234");

        company = new Company();
        company.setId(1L);
        company.setName("Test Company");
        company.setNit("123456789");
        company.setAddress("Test Address");
        company.setPhone("555-1234");
    }

    @Test
    void createCompany_Success() {
        when(companyRepository.existsByNit(companyDTO.getNit())).thenReturn(false);
        when(companyRepository.save(any(Company.class))).thenReturn(company);

        CompanyDTO result = companyService.createCompany(companyDTO);

        assertNotNull(result);
        assertEquals(company.getId(), result.getId());
        assertEquals(company.getName(), result.getName());
        assertEquals(company.getNit(), result.getNit());
        
        verify(companyRepository).existsByNit(companyDTO.getNit());
        verify(companyRepository).save(any(Company.class));
    }

    @Test
    void createCompany_ThrowsException_WhenNitExists() {
        when(companyRepository.existsByNit(companyDTO.getNit())).thenReturn(true);

        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> companyService.createCompany(companyDTO)
        );
        
        assertEquals("El NIT ya está registrado.", exception.getMessage());
        verify(companyRepository).existsByNit(companyDTO.getNit());
        verify(companyRepository, never()).save(any(Company.class));
    }

    @Test
    void getAllCompanies_Success() {
        Company company2 = new Company();
        company2.setId(2L);
        company2.setName("Company 2");
        company2.setNit("987654321");
        
        List<Company> companies = Arrays.asList(company, company2);
        when(companyRepository.findAll()).thenReturn(companies);

        List<CompanyDTO> result = companyService.getAllCompanies();

        assertEquals(2, result.size());
        assertEquals("Test Company", result.get(0).getName());
        assertEquals("Company 2", result.get(1).getName());
        
        verify(companyRepository).findAll();
    }

    @Test
    void getAllCompanies_ReturnsEmptyList() {
        when(companyRepository.findAll()).thenReturn(Arrays.asList());

        List<CompanyDTO> result = companyService.getAllCompanies();

        assertTrue(result.isEmpty());
        verify(companyRepository).findAll();
    }
}