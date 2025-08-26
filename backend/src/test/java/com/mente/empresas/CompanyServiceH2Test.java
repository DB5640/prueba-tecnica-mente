package com.mente.empresas;

import com.mente.empresas.dto.CompanyDTO;
import com.mente.empresas.repository.CompanyRepository;
import com.mente.empresas.service.CompanyService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
@Import(CompanyService.class)
@Transactional
@Rollback
class CompanyServiceH2Test {


    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyService companyService;

    private CompanyDTO companyDTO;

    @BeforeEach
    void setUp() {
        companyRepository.deleteAll();
        companyDTO = new CompanyDTO();
        companyDTO.setName("Test Company");
        companyDTO.setNit("123456789");
        companyDTO.setAddress("Test Address");
        companyDTO.setPhone("555-1234");
        
        entityManager.clear();
    }

    @Test
    void createCompany_Success() {
        // When
        CompanyDTO result = companyService.createCompany(companyDTO);

        // Then
        assertNotNull(result);
        assertNotNull(result.getId());
        assertEquals(companyDTO.getName(), result.getName());
        assertEquals(companyDTO.getNit(), result.getNit());
        assertEquals(companyDTO.getAddress(), result.getAddress());
        assertEquals(companyDTO.getPhone(), result.getPhone());
        
        assertEquals(1, companyRepository.count());
    }

    @Test
    void createCompany_ThrowsException_WhenNitExists() {
        // Given - crear empresa primero
        companyService.createCompany(companyDTO);

        // When & Then
        CompanyDTO duplicateDTO = new CompanyDTO();
        duplicateDTO.setName("Another Company");
        duplicateDTO.setNit("123456789"); // mismo NIT
        duplicateDTO.setAddress("Another Address");
        duplicateDTO.setPhone("555-9999");

        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> companyService.createCompany(duplicateDTO)
        );
        
        assertEquals("El NIT ya está registrado.", exception.getMessage());
        assertEquals(1, companyRepository.count()); // solo debe haber una empresa
    }

    @Test
    void getAllCompanies_Success() {
        // Given
        companyService.createCompany(companyDTO);
        
        CompanyDTO company2DTO = new CompanyDTO();
        company2DTO.setName("Company 2");
        company2DTO.setNit("987654321");
        company2DTO.setAddress("Address 2");
        company2DTO.setPhone("555-5678");
        
        companyService.createCompany(company2DTO);

        // When
        List<CompanyDTO> result = companyService.getAllCompanies();

        // Then
        assertEquals(2, result.size());
        assertTrue(result.stream().anyMatch(c -> c.getName().equals("Test Company")));
        assertTrue(result.stream().anyMatch(c -> c.getName().equals("Company 2")));
    }

    @Test
    void getAllCompanies_ReturnsEmptyList() {
        // When
        List<CompanyDTO> result = companyService.getAllCompanies();

        // Then
        assertTrue(result.isEmpty());
        assertEquals(0, companyRepository.count());
    }
}