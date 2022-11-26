package edu.miu.waa.propertymanagementservice.service;

import edu.miu.waa.propertymanagementservice.domain.ApplicationDetail;
import edu.miu.waa.propertymanagementservice.domain.ContactDetail;
import edu.miu.waa.propertymanagementservice.domain.RequestVisitDetail;

public interface ContactService {

    String requestVisit(RequestVisitDetail requestVisitDetail);

    String contact(ContactDetail contactDetail);

    String submitApplication(ApplicationDetail applicationDetail);
}
