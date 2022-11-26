package edu.miu.waa.propertymanagementservice.entity;


import edu.miu.waa.propertymanagementservice.domain.UserDetailsAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;
import java.util.Optional;

public class AuditListener {

    @PrePersist
    void preCreate(Object entity) {
        if(entity instanceof Auditable auditable) {
            auditable.setCreatedDate(LocalDateTime.now());
            String username = Optional.ofNullable(SecurityContextHolder
                            .getContext().getAuthentication())
                    .map(Authentication::getPrincipal)
                    .map(a -> (UserDetailsAdapter)a)
                    .map(UserDetailsAdapter::getUsername)
                    .orElse("");

            auditable.setCreatedBy(username);
        }

    }

    @PreUpdate
    void preUpdate(Object entity) {
        if(entity instanceof Auditable auditable) {
            auditable.setUpdatedDate(LocalDateTime.now());
            String username = Optional.ofNullable(SecurityContextHolder
                            .getContext().getAuthentication())
                    .map(Authentication::getPrincipal)
                    .map(a -> (UserDetailsAdapter)a)
                    .map(UserDetailsAdapter::getUsername)
                    .orElse("");
            auditable.setUpdatedBy(username);
        }
    }

    @PreRemove
    void preRemove(Object entity) {
        if(entity instanceof Auditable auditable) {
            String username = Optional.ofNullable(SecurityContextHolder
                            .getContext().getAuthentication())
                    .map(Authentication::getPrincipal)
                    .map(a -> (UserDetailsAdapter)a)
                    .map(UserDetailsAdapter::getUsername)
                    .orElse("");
            auditable.setDeletedBy(username);
            auditable.setDeletedDate(LocalDateTime.now());
        }
    }
}
