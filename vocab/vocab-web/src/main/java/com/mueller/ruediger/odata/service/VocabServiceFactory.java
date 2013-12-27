package com.mueller.ruediger.odata.service;

import javax.persistence.EntityManagerFactory;

import org.apache.olingo.odata2.processor.api.jpa.ODataJPAContext;
import org.apache.olingo.odata2.processor.api.jpa.ODataJPAServiceFactory;
import org.apache.olingo.odata2.processor.api.jpa.exception.ODataJPARuntimeException;

/**
 * Odata JPA Processor implementation class
 */
public class VocabServiceFactory extends ODataJPAServiceFactory {

	private static final String PERSISTENCE_UNIT_NAME = "vocab-model-jpa";

	@Override
	public ODataJPAContext initializeODataJPAContext()
			throws ODataJPARuntimeException {
		ODataJPAContext oDataJPAContext = this.getODataJPAContext();
		try {
			EntityManagerFactory emf = JpaEntityManagerFactory
					.getEntityManagerFactory();
			oDataJPAContext.setEntityManagerFactory(emf);
			oDataJPAContext.setPersistenceUnitName(PERSISTENCE_UNIT_NAME);
			oDataJPAContext.setJPAEdmMappingModel("EspmEdmMapping.xml");
			return oDataJPAContext;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}