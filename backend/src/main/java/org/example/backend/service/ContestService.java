package org.example.backend.service;

import org.example.backend.Entity.Contest;
import org.example.backend.repository.ContestRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ContestService {
    private ContestRepository contestRepository;

    public ContestService(ContestRepository contestRepository) {
        this.contestRepository = contestRepository;
    }

    public List<Contest> getAll(){
        List<Contest> contests = contestRepository.findAll();
        contests.sort(Comparator.comparing(Contest::getStart_time).reversed());
        return contests;
    }
}
