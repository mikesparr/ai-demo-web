import { useRef } from "react"
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { ViewIcon } from "@chakra-ui/icons"
import BatchReviewTable from "./BatchReviewTable"

const BatchReviewDrawer = (props) => {

  const { data, submitHandler } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const corrections = []

  // corrections (received from review table)
  const addToCorrections = (subjectId) => {
    corrections.push(subjectId)
  }

  const getCorrectedBatch = (batch, corrections) => {
    const correctedBatch = {
      batch_id: batch.batch_id,
      subjects: batch.subjects,
      ratings: []
    }

    // loop through subjects and correct prediction values as necessary
    batch.subjects.map((subject, index) => {
      let prediction = batch.predictions[index] // default
      if (corrections.includes(subject)) {
        prediction = batch.predictions[index] == 'real' ? 'fake' : 'real' // opposite of orig prediction
        console.log("Corrected subject", subject)
      }
      correctedBatch.ratings.push(prediction)
    })
    return correctedBatch
  }

  const handleSubmit = (close) => {
    submitHandler(getCorrectedBatch(data, corrections))
    close()
  }

  return (
    <>
      <Button
        ref={btnRef}
        leftIcon={<ViewIcon />} 
        colorScheme="blue" 
        ml={20}
        size="sm"
        mr={3}
        onClick={onOpen}
      >
        Review
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Review batch</DrawerHeader>

            <DrawerBody>
              <BatchReviewTable data={data} correctionHandler={addToCorrections} />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue" onClick={() => handleSubmit(onClose)}>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default BatchReviewDrawer
