package edu.miu.waa.propertymanagementservice.repository;

import edu.miu.waa.propertymanagementservice.entity.Application;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends CrudRepository<Application, Integer> {
    long count();
}
