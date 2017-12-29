const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
    res.render('index', {title: 'Home'});
};

exports.addStore = (req, res) => {
    res.render('editStore', {title: 'Add store'});
};

exports.createStore = async (req, res) => {
    const store = await (new Store(req.body)).save();
    req.flash('success', `Successfully created ${store.name}. Care leave a review!`);
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    // QUERY the database for a list of all stores
    const stores = await Store.find();

    res.render('stores', {title:'Stores', stores});
};

exports.editStore = async (req, res) => {
    // find the store
    const store = await Store.findOne({_id: req.params.id});
    // confirm they are the owner of the store

    // render out the edit form so the user can update their store
    res.render('editStore', {title: `Edit ${store.name}`, store});
};

exports.updateStore = async (req, res) => {
    // find and update the store
    const store = await Store.findOneAndUpdate({_id: req.params.id}, req.body, {
        new: true, // return the new store instead of the old one
        runValidators: true // force schema validators
    }).exec();

    req.flash('success', `Successfully updated ${store.name}. <a href='/stores/${store.slug}'>View Store</a>`);
    res.redirect(`/store/${store._id}/edit`);
    // redirect to the store and tell them it worked
};