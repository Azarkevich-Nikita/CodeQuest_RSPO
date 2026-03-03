package org.example.backend.Controller;

import org.example.backend.Entity.Contest;
import org.example.backend.repository.ContestRepository;
import org.example.backend.service.ContestService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ContestController {
    private ContestService contestService;

    public ContestController(ContestService contestService) {
        this.contestService = contestService;
    }

    @GetMapping("/contests")
    public List<Contest> getUsers() {
        return contestService.getAll();
    }
}
