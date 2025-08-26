package com.mente.empresas.service;

import com.mente.empresas.dto.CompanyDTO;
import com.mente.empresas.entity.Company;
import com.mente.empresas.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        if (companyRepository.existsByNit(companyDTO.getNit())) {
            throw new IllegalArgumentException("El NIT ya está registrado.");
        }

        Company company = new Company();
        company.setName(companyDTO.getName());
        company.setNit(companyDTO.getNit());
        company.setAddress(companyDTO.getAddress());
        company.setPhone(companyDTO.getPhone());

        Company savedCompany = companyRepository.save(company);
        return mapToDTO(savedCompany);
    }

    public List<CompanyDTO> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private CompanyDTO mapToDTO(Company company) {
        CompanyDTO dto = new CompanyDTO();
        dto.setId(company.getId());
        dto.setName(company.getName());
        dto.setNit(company.getNit());
        dto.setAddress(company.getAddress());
        dto.setPhone(company.getPhone());
        return dto;
    }
}