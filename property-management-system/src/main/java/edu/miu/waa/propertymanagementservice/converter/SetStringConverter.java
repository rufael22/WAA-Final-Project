package edu.miu.waa.propertymanagementservice.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Converter
public class SetStringConverter implements AttributeConverter<Set<String>, String> {
    private static final String SPLIT_CHAR = ";";

    @Override
    public String convertToDatabaseColumn(Set<String> attribute) {
        return attribute != null ? String.join(SPLIT_CHAR, attribute) : null;
    }

    @Override
    public Set<String> convertToEntityAttribute(String dbData) {
        return dbData == null ? Collections.emptySet() : new HashSet<String>(Arrays.asList(dbData.split(SPLIT_CHAR)));
    }
}
