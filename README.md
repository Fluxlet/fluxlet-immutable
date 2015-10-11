[![Build Status](https://travis-ci.org/Fluxlet/fluxlet-immutable.svg?branch=master)](https://travis-ci.org/Fluxlet/fluxlet-immutable)
[![npm version](https://img.shields.io/npm/v/fluxlet-immutable.svg)](https://www.npmjs.com/package/fluxlet-immutable)
[![Dependency Status](https://david-dm.org/fluxlet/fluxlet-immutable.svg)](https://david-dm.org/fluxlet/fluxlet-immutable)
[![devDependency Status](https://david-dm.org/fluxlet/fluxlet-immutable/dev-status.svg)](https://david-dm.org/fluxlet/fluxlet-immutable#info=devDependencies)
[![License](https://img.shields.io/github/license/fluxlet/fluxlet-immutable.svg)](LICENSE)

# Fluxlet Immutable State Utilities

Provides some handy functions for working with immutable state in Fluxlet.

Take a look at the source for the full details, here is a short overview of each module...

## update

Perform deep updates to immutable data structures.

## chain

Combine several updates on a single immutable structure.

## clone

Clone an object/array with a mutated property/element, used by update but may also be handy on its own.

## freeze

Perform shallow and deep freezes of objects/arrays.

## get

Get nested values from a structure given a path.

## map

Some variations on the traditional map functions, but specifically designed to
work with the update function.
