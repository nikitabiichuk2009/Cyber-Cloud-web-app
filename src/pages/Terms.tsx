// import React from 'react'
// import { useTranslation } from 'react-i18next'

// import { setDocumentTitle } from 'components/PageElements/helpers'
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react'
// import { Header } from 'components/PageElements/Header'
// import { Footer } from 'components/PageElements/Footer'

export const TermsPage = () => {
  // const { t } = useTranslation()
  // setDocumentTitle(t('Terms and condition'))

  return (
    <Flex direction="column" minH="100vh">
      {/* <Header /> */}
      <Container as="main" maxW="container.xl" flex="1" p="28px 16px 80px 16px">
        <Box layerStyle="outline" py="32px" px="32px">
          <Heading as="h1" color="white" alignContent="center">
            {`Terms and condition`}
          </Heading>

          <VStack spacing="32px" alignItems="flex-start">
            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                1. {`Introduction`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`Last updated 02/21/2024`}
              </Text>
              <Text fontSize="xl" color="textGreyLight">
                {`Welcome to Movie Mingle, a platform dedicated to enhancing language learning
                through the use of movie and TV series subtitles.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                2. {`Your Acceptance of this Agreement`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`These terms of service are entered into by and between You and Movie Mingle platform, ("Platform," "we," "our," or "us"). The following terms and conditions, together with any documents they expressly incorporate by reference (collectively "Terms of Service"), govern your access to and use of www.Movie-Mingle.com, including any content, functionality, and services offered on or through www.Movie-Mingle.com (the "Website").`}
              </Text>
              <Text fontSize="xl" color="textGreyLight">
                {`Please read the Terms of Service carefully before you start to use the Website.`}
              </Text>
              <Text fontSize="xl" color="textGreyLight">
                {`By using the Website [or by clicking to accept or agree to the Terms of Service when this option is made available to you], you accept and agree to be bound and abide by these Terms of Service and our Privacy Policy, found at /privacy-policy, incorporated herein by reference. If you do not want to agree to these Terms of Service, you must not access or use the Website.`}
              </Text>
              <Text fontSize="xl" color="textGreyLight">
                {`You must be at least 13 years old to use this Website. However, children of all ages may use the Website if enabled by a parent or legal guardian. If you are under 18, you represent that you have your parent or guardian's permission to use the Website. Please have them read these Terms of Service with you.`}
              </Text>
              <Text fontSize="xl" color="textGreyLight">
                {`If you are a parent or legal guardian of a user under the age of 18, by allowing your child to use the Website, you are subject to the terms of these Terms of Service and responsible for your child's activity on the Website.`}
              </Text>
              <Text fontSize="xl" color="textGreyLight" textTransform="uppercase">
                {`BY ACCESSING AND USING THIS WEBSITE, YOU:`}
              </Text>
              <Text fontSize="xl" color="textGreyLight" textTransform="uppercase">
                {`ACCEPT AND AGREE TO BE BOUND AND COMPLY WITH THESE TERMS OF SERVICE;`}
              </Text>
              <Text fontSize="xl" color="textGreyLight" textTransform="uppercase">
                {`YOU REPRESENT AND WARRANT THAT YOU ARE THE LEGAL AGE OF MAJORITY UNDER APPLICABLE LAW TO FORM A BINDING CONTRACT WITH US; `}
              </Text>
              <Text fontSize="xl" color="textGreyLight" textTransform="uppercase">
                {`AND,YOU AGREE IF YOU ACCESS THE WEBSITE FROM A JURISDICTION WHERE IT IS NOT PERMITTED, YOU DO SO AT YOUR OWN RISK.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                3. {`Updates to Terms of Service`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`We may revise and update these Terms of Service from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Website thereafter.`}
              </Text>
              <Text fontSize="xl" color="textGreyLight">
                {`Continuing to use the Website following the posting of revised Terms of Service means that you accept and agree to the changes. You are expected to check this page each time you access this Website so you are aware of any changes, as they are binding on you.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                4. {`Your Responsibilities`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`You are required to ensure that all persons who access the Website are aware of this Agreement and comply with it. `}
              </Text>
              <Text fontSize="xl" color="textGreyLight" textTransform="uppercase">
                {`YOU ARE SOLELY AND ENTIRELY RESPONSIBLE FOR YOUR USE OF THE WEBSITE AND YOUR COMPUTER, INTERNET AND DATA SECURITY.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                5. {`Prohibited Activities`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`You may use the Website only for lawful purposes and in accordance with these Terms of Service. You agree not to use the Website:`}
              </Text>
              <UnorderedList variant="unordered">
                <ListItem>{`In any way that violates any applicable federal, state, local or international law or regulation (including, without limitation, any laws regarding the exports of data software).`}</ListItem>
                <ListItem>{`For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information or otherwise.`}</ListItem>
                <ListItem>{`To send, knowingly receive, upload, download, use, or re-use any material that does not comply with the Submission Standards set out in these Terms of Service.`}</ListItem>
                <ListItem>{`To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.`}</ListItem>
                <ListItem>{`To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or which as determined by us, may harm the Platform or users of the website, or expose them to liability.`}</ListItem>
              </UnorderedList>

              <Text fontSize="xl" color="textGreyLight">
                {`Additionally, you agree not to:`}
              </Text>

              <UnorderedList variant="unordered">
                <ListItem>{`Use the Website in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Website, including their ability to engage in real-time activities through the Website.`}</ListItem>
                <ListItem>{`Use any robot, spider, or other automatic device, process, or means to access the Website for any purpose, including monitoring or copying any of the material on the Website.`}</ListItem>
                <ListItem>{`Use any manual process to monitor or copy any of the material on the Website, or for any other purpose not expressly authorized in these Terms of Service, without our prior written consent.`}</ListItem>
                <ListItem>{`Use any device, software, or routine that interferes with the proper working of the Website.`}</ListItem>
                <ListItem>{`Introduce any viruses, Trojan horses, worms, logic bombs, or other material that is malicious or technologically harmful.`}</ListItem>

                <ListItem>{`Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website.`}</ListItem>
                <ListItem>{`Attack the Website via a denial-of-service attack or a distributed denial-of-service attack.`}</ListItem>
                <ListItem>{`Otherwise attempting to interfere with the proper working of the Website.`}</ListItem>
              </UnorderedList>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                6. {`Intellectual Property Rights`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Platform, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.`}
              </Text>
              <Text fontSize="xl" color="textGreyLight">
                {`These Terms of Service permit you to use the Website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website, except as follows:`}
              </Text>

              <UnorderedList variant="unordered">
                <ListItem>{`Your computer may temporarily store copies of such material in RAM incidental to your accessing and viewing those materials.`}</ListItem>
                <ListItem>{`You may store files that are automatically cached by your Web browser for display enhancement purposes.`}</ListItem>
                <ListItem>{`You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use and not for further reproduction, publication or distribution.`}</ListItem>
              </UnorderedList>

              <Text fontSize="xl" color="textGreyLight">
                {`You must not:`}
              </Text>

              <UnorderedList variant="unordered">
                <ListItem>{`Modify copies of any materials from this site.`}</ListItem>
                <ListItem>{`Delete or alter any of the copyright, trademark, or other proprietary rights notices from copies of materials from this site.`}</ListItem>
              </UnorderedList>

              <Text fontSize="xl" color="textGreyLight">
                {`You must not access or use for any commercial purposes any part of the website or any services or materials available through the Website.`}
              </Text>

              <Text fontSize="xl" color="textGreyLight">
                {`If you print, copy, modify, download, or otherwise use or provide any other person with access to any part of the Website in breach of the Terms of Service, your right to use the Website will stop immediately and you must, at our option, return or destroy any copies of the materials you have made. No right, title, or interest in or to the Website or any content on the Website is transferred to you, and all rights not expressly granted are reserved by the Platform. Any use of the Website not expressly permitted by these Terms of Service is a breach of these Terms of Service and may violate copyright, trademark, and other laws.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                7. {`Our Rights`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`We have the right, without provision of notice to terminate or suspend your access to all or part of the Website for any or no reason, including, without limitation, any violation of these Terms of Service.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                8. {`Third-Party Links and Content`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`For your convenience, this Website may provide links or pointers to third-party sites or third-party content. We make no representations about any other websites or third-party content that may be accessed from this Website. If you choose to access any such sites, you do so at your own risk. We have no control over the third-party content or any such third-party sites and accept no responsibility for such sites or for any loss or damage that may arise from your use of them. You are subject to any terms and conditions of such third-party sites.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                9. {`Disclaimer of Warranties`}
              </Heading>
              <UnorderedList variant="unordered">
                <ListItem>{`The platform and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied.`}</ListItem>
                <ListItem>{`Platform does not warrant that the website or any content will be uninterrupted, secure, or free from errors or omissions.`}</ListItem>
              </UnorderedList>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                10. {`Limitation of Liability`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`We will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Platform.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                11. {`Privacy Policy`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`The personal information you provide is used exclusively for the functioning of the platform and communication with you`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                12. {`Cookies`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`We employ the use of cookies. By accessing to Platform, you agreed to use cookies.`}
              </Text>
              <Text fontSize="xl" color="textGreyLight">
                {`Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                13. {`Copyright Infringement`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`We respect the intellectual property rights of others and expect our users to do the same. In accordance with the Digital Millennium Copyright Act, which can be found here`}{' '}
                <Link
                  variant="text"
                  isExternal
                  href="http://www.copyright.gov/legislation/dmca.pdf"
                >
                  {`http://www.copyright.gov/ legislation/ dmca.pdf`}
                </Link>
                {`, and specifically in accordance with 17 U.S.C. § 512(c)(3), we will respond expeditiously to claims of copyright infringement committed using the Platform Website if such claims are reported to Administration of the Platform.`}
              </Text>

              <Text fontSize="xl" color="textGreyLight">
                {`If you are a copyright owner or authorized to act on behalf of one, please report alleged copyright infringements taking place on or through the Website by completing a DMCA Notice of Alleged Infringement and delivering it to Administration of the Platform. Upon receipt of Notice as described below, we will take whatever action in our sole discretion as we deem appropriate, including removal of the challenged content from the Website. Please note that if you fail to comply with all of the requirements of this section and of 17 U.S.C. § 512(c)(3), your DMCA notice may not be valid.`}
              </Text>
            </VStack>

            <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" alignContent="start">
                14. {`Notice`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`We may provide any notice to you under these Terms of Service by: (i) sending a message to the email address you provide to us and consent to us using; or (ii) by posting to the Website. Notices sent by email will be effective when we send the email and notices we provide by posting will be effective upon posting. It is your responsibility to keep your email address current.`}
              </Text>
            </VStack>

            {/* <VStack spacing="16px" alignItems="flex-start">
              <Heading as="h2" size="md" color="white" align="start">
                15.  {`Contact Information`}
              </Heading>
              <Text fontSize="xl" color="textGreyLight">
                {`For questions about these Terms, contact us`}
              </Text>
            </VStack> */}
          </VStack>
        </Box>
      </Container>
      {/* <Footer /> */}
    </Flex>
  )
}
