package edu.miu.waa.propertymanagementservice.controller;

import edu.miu.waa.propertymanagementservice.dto.PropertyDto;
import edu.miu.waa.propertymanagementservice.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/properties")
public class PropertyController {
    private final PropertyService propertyService;

    @PostMapping
    public PropertyDto save(@RequestBody PropertyDto property) {
        return propertyService.save(property);
    }

    @GetMapping
    public Set<PropertyDto> findAll() {
        return propertyService.findAll();
    }

    @GetMapping("/{id}")
    public PropertyDto findById(@PathVariable int id) {
        return propertyService.findById(id);
    }

    @GetMapping("/search")
    public List<PropertyDto> search(@RequestParam(defaultValue = "SELL") String propertyType,
                                    @RequestParam(defaultValue = "") List<String> homeType,
                                    @RequestParam(defaultValue = "-1") int minPrice,
                                    @RequestParam(defaultValue = Integer.MAX_VALUE + "") int maxPrice,
                                    @RequestParam(defaultValue = "0") int minRoomNumber,
                                    @RequestParam(defaultValue = "%") String street,
                                    @RequestParam(defaultValue = "%") String city,
                                    @RequestParam(defaultValue = "%") String zipCode,
                                    @RequestParam(defaultValue = "true") boolean listed,
                                    @RequestParam(defaultValue = "false") boolean deleted,
                                    @RequestParam(defaultValue = "false") boolean onlyLocation) {
        return propertyService.search(propertyType, homeType, minPrice, maxPrice, minRoomNumber, street, city, zipCode, listed, deleted, onlyLocation);
    }

    @PutMapping("/{id}/views")
    public boolean increaseView(@PathVariable int id) {
        propertyService.increaseView(id);
        return true;
    }
    @PatchMapping("/{id}/listed/{value}")
    public PropertyDto updateListedProperty(@PathVariable int id, @PathVariable Boolean value) {
        return propertyService.updateListedProperty(id, value);
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable int id) {
        propertyService.deleteProperty(id);
    }
}
