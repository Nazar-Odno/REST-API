/** @format */

const express = require('express');
const { validateBody, isValidId, authenticate, checkOwner } = require('../../middlewares');
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

router.get('/', authenticate, ctrlWrapper(listContacts));

router.get('/:contactId', authenticate, isValidId, checkOwner, ctrlWrapper(getContactById));

router.post('/', authenticate, validateBody(contactAddSchema), ctrlWrapper(addContact));

router.put(
	'/:contactId',
	authenticate,
	isValidId,
	validateBody(contactAddSchema),
	ctrlWrapper(updateContact)
);

router.delete('/:contactId', isValidId, ctrlWrapper(removeContact));

module.exports = router;
