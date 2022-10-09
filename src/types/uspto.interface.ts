interface patData {
    id: string
    color: string
}

interface ApplicationNumberText {
    value: string
    electronicText: string
}

interface PersonNameOrOrganizationNameOrEntityName {
    personFullName: string
}

interface Name {
    personNameOrOrganizationNameOrEntityName: PersonNameOrOrganizationNameOrEntityName[]
}

interface PrimaryExaminerOrAssistantExaminerOrAuthorizedOfficer {
    name: Name
}

interface PersonStructuredName {
    firstName: string
    middleName: string
    lastName: string
}

interface PersonNameOrOrganizationNameOrEntityName2 {
    personStructuredName: PersonStructuredName
}

interface Name2 {
    personNameOrOrganizationNameOrEntityName: PersonNameOrOrganizationNameOrEntityName2[]
}

interface GeographicRegionName {
    value: string
    geographicRegionCategory: string
}

interface ContactOrPublicationContact {
    name: Name2
    cityName: string
    geographicRegionName: GeographicRegionName
    countryCode: string
}

interface InventorOrDeceasedInventor {
    contactOrPublicationContact: ContactOrPublicationContact[]
}

interface PersonStructuredName2 {
    firstName: string
    middleName: string
    lastName: string
    nameSuffix: string
}

interface PersonNameOrOrganizationNameOrEntityName3 {
    personStructuredName: PersonStructuredName2
}

interface Name3 {
    personNameOrOrganizationNameOrEntityName: PersonNameOrOrganizationNameOrEntityName3[]
}

interface PhoneNumber {
    value: string
}

interface PhoneNumberBag {
    phoneNumber: PhoneNumber[]
}

interface ContactOrPublicationContact2 {
    name: Name3
    phoneNumberBag: PhoneNumberBag
}

interface RegisteredPractitioner {
    registeredPractitionerRegistrationNumber: string
    registeredPractitionerCategory: string
    contactOrPublicationContact: ContactOrPublicationContact2[]
    sequenceNumber: string
    activeIndicator: boolean
}

interface PersonStructuredName3 {
    lastName: string
}

interface PersonNameOrOrganizationNameOrEntityName4 {
    personStructuredName: PersonStructuredName3
}

interface Name4 {
    personNameOrOrganizationNameOrEntityName: PersonNameOrOrganizationNameOrEntityName4[]
}

interface AddressLineText {
    value: string
}

interface GeographicRegionName2 {
    value: string
}

interface PostalStructuredAddress {
    addressLineText: AddressLineText[]
    cityName: string
    geographicRegionName: GeographicRegionName2[]
    countryCode: string
    postalCode: string
}

interface PostalAddress {
    postalStructuredAddress: PostalStructuredAddress
}

interface PostalAddressBag {
    postalAddress: PostalAddress[]
}

interface PartyIdentifierOrContact {
    name: Name4
    postalAddressBag: PostalAddressBag
    value: string
}

interface ApplicantBagOrInventorBagOrOwnerBag {
    primaryExaminerOrAssistantExaminerOrAuthorizedOfficer: PrimaryExaminerOrAssistantExaminerOrAuthorizedOfficer[]
    inventorOrDeceasedInventor: InventorOrDeceasedInventor[]
    registeredPractitioner: RegisteredPractitioner[]
    partyIdentifierOrContact: PartyIdentifierOrContact[]
}

interface PartyBag {
    applicantBagOrInventorBagOrOwnerBag: ApplicantBagOrInventorBagOrOwnerBag[]
}

interface GroupArtUnitNumber {
    value: string
    electronicText: string
}

interface MainNationalClassification {
    nationalClass: string
    nationalSubclass: string
}

interface CpcClassificationBagOrIPCClassificationOrECLAClassificationBag {
    ipOfficeCode: string
    mainNationalClassification: MainNationalClassification
}

interface PatentClassificationBag {
    cpcClassificationBagOrIPCClassificationOrECLAClassificationBag: CpcClassificationBagOrIPCClassificationOrECLAClassificationBag[]
}

interface InventionTitle {
    content: string[]
}

interface PatentPublicationIdentification {
    publicationNumber: string
    publicationDate: string
}

interface PatentGrantIdentification {
    patentNumber: string
    grantDate: string
}

interface PatentCaseMetadata {
    applicationNumberText: ApplicationNumberText
    filingDate: string
    applicationTypeCategory: string
    partyBag: PartyBag
    groupArtUnitNumber: GroupArtUnitNumber
    applicationConfirmationNumber: string
    applicantFileReference: string
    patentClassificationBag: PatentClassificationBag
    businessEntityStatusCategory: string
    firstInventorToFileIndicator: string
    inventionTitle: InventionTitle
    applicationStatusCategory: string
    applicationStatusDate: string
    officialFileLocationCategory: string
    patentPublicationIdentification: PatentPublicationIdentification
    patentGrantIdentification: PatentGrantIdentification
}

interface ProsecutionHistoryData {
    eventDate: string
    eventCode: string
    eventDescriptionText: string
}

interface ProsecutionHistoryDataBag {
    prosecutionHistoryData: ProsecutionHistoryData[]
}

interface PatentTermAdjustmentHistoryData {
    eventSequenceNumber: number
    eventDate: string
    eventDescriptionText: string
    ipOfficeDayDelayQuantity: number
    applicantDayDelayQuantity: number
    originatingEventSequenceNumber: number
}

interface PatentTermAdjustmentHistoryDataBag {
    patentTermAdjustmentHistoryData: PatentTermAdjustmentHistoryData[]
}

interface PatentTermAdjustmentData {
    aDelayQuantity: number
    bDelayQuantity: number
    cDelayQuantity: number
    overlappingDayQuantity: number
    nonOverlappingDayQuantity: number
    ipOfficeDayDelayQuantity: number
    applicantDayDelayQuantity: number
    adjustmentTotalQuantity: number
    patentTermAdjustmentHistoryDataBag: PatentTermAdjustmentHistoryDataBag
}

interface PatentTermData {
    patentTermAdjustmentData: PatentTermAdjustmentData
}

interface PersonNameOrOrganizationNameOrEntityName5 {
    value: string
}

interface Name5 {
    personNameOrOrganizationNameOrEntityName: PersonNameOrOrganizationNameOrEntityName5[]
}

interface ContactOrPublicationContact3 {
    name: Name5
}

interface Assignor {
    executionDate: string
    contactOrPublicationContact: ContactOrPublicationContact3[]
}

interface AssignorBag {
    assignor: Assignor[]
}

interface PersonNameOrOrganizationNameOrEntityName6 {
    value: string
}

interface Name6 {
    personNameOrOrganizationNameOrEntityName: PersonNameOrOrganizationNameOrEntityName6[]
}

interface PostalAddressText {
    sequenceNumber: string
    value: string
}

interface PostalAddress2 {
    postalAddressText: PostalAddressText[]
}

interface PostalAddressBag2 {
    postalAddress: PostalAddress2[]
}

interface ContactOrPublicationContact4 {
    name: Name6
    postalAddressBag: PostalAddressBag2
}

interface Assignee {
    contactOrPublicationContact: ContactOrPublicationContact4[]
}

interface AssigneeBag {
    assignee: Assignee[]
}

interface PersonNameOrOrganizationNameOrEntityName7 {
    value: string
}

interface Name7 {
    personNameOrOrganizationNameOrEntityName: PersonNameOrOrganizationNameOrEntityName7[]
}

interface PostalAddressText2 {
    sequenceNumber: string
    value: string
}

interface PostalAddress3 {
    postalAddressText: PostalAddressText2[]
}

interface PostalAddressBag3 {
    postalAddress: PostalAddress3[]
}

interface PartyIdentifierOrContact2 {
    name: Name7
    postalAddressBag: PostalAddressBag3
}

interface CorrespondenceAddress {
    partyIdentifierOrContact: PartyIdentifierOrContact2[]
}

interface AssignmentData {
    reelNumber: string
    frameNumber: string
    documentReceivedDate: string
    recordedDate: string
    mailDate: string
    pageTotalQuantity: number
    conveyanceText: string
    assignorBag: AssignorBag
    assigneeBag: AssigneeBag
    correspondenceAddress: CorrespondenceAddress
    sequenceNumber: string
}

interface AssignmentDataBag {
    assignmentData: AssignmentData[]
    assignmentTotalQuantity: number
}

interface ContentResource {
    officialDate: string
    documentCode: string
    descriptionText: string
    documentCategory: string
    pageTotalQuantity: number
}

interface ContentResourceBag {
    contentResource: ContentResource[]
}

interface PatentData {
    patentCaseMetadata: PatentCaseMetadata
    prosecutionHistoryDataBag: ProsecutionHistoryDataBag
    patentTermData: PatentTermData
    assignmentDataBag: AssignmentDataBag
    contentResourceBag: ContentResourceBag
    st96Version: string
    ipoVersion: string
}

interface RootObject {
    PatentData: PatentData[]
}
