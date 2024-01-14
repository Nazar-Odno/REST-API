/** @format */

const express = require('express');

const {
	validateBody,
	isValidId,
	authenticate,
	checkOwner,
	isEmptyBody,
} = require('../../middlewares');
const { contactAddSchema } = require('../../models');
const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../utils');

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(listContacts));

router.get('/:contactId', isValidId, checkOwner, ctrlWrapper(getContactById));

router.post('/', isEmptyBody, validateBody(contactAddSchema), ctrlWrapper(addContact));

router.put(
	'/:contactId',
	isEmptyBody,
	isValidId,
	validateBody(contactAddSchema),
	ctrlWrapper(updateContact)
);

router.delete('/:contactId', isValidId, ctrlWrapper(removeContact));

module.exports = router;
